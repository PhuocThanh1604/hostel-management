package com.example.hostelmanage.controller;

import com.example.hostelmanage.model.Account;
import com.example.hostelmanage.model.Profile;
import com.example.hostelmanage.model.Role;
import com.example.hostelmanage.payload.SignInRequest;
import com.example.hostelmanage.payload.SignUpRequest;
import com.example.hostelmanage.payload.response.MessageResponse;
import com.example.hostelmanage.repository.AccountRepository;
import com.example.hostelmanage.repository.ProfileRepository;
import com.example.hostelmanage.repository.RoleRepository;
import com.example.hostelmanage.service.JwtService;
import com.example.hostelmanage.service.UserDetailsImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {
    @Inject
    public AccountRepository accountRepository;

    @Inject
    private PasswordEncoder passwordEncoder;

    @Inject
    private RoleRepository roleRepository;

    @Inject
    private ProfileRepository profileRepository;

    @Inject
    AuthenticationManager authenticationManager;

    @Inject
    private JwtService jwtService;

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest signInRequest){
        Optional<Account> existAccount = accountRepository.findAccountByEmail(signInRequest.getEmail());

        if(!existAccount.isPresent()){
            return new ResponseEntity<>(new MessageResponse("Email is not already to use"), HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
        System.out.println("flog check " + authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtService.generateJwtToken(authentication);
        System.out.println("ten ten " + jwt);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        System.out.println("ten ten " + userDetails.toString());
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .body(userDetails);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest){
        System.out.println("name " + signUpRequest.getFullName());
        Optional<Account> existAccount = accountRepository.findAccountByEmail(signUpRequest.getEmail());

        if(existAccount.isPresent()){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Email is already to use"));
        }

        // Create an account
        Account newAccount = new Account();
        Profile profile = new Profile();
        newAccount.setEmail(signUpRequest.getEmail());
        newAccount.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        newAccount.setPhone(signUpRequest.getPhone());



        profile.setFullName(signUpRequest.getFullName());
        profile.setCardNumber(signUpRequest.getCardNumber());
        profile.setPicture(signUpRequest.getPicture());

        profile = profileRepository.save(profile);
        newAccount.setProfile(profile);

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            switch (role) {
                case "admin":
                    Optional<Role> adminRole = roleRepository.findById(Long.valueOf(2));
                    if(!adminRole.isPresent()){
                            new RuntimeException("Error: Role is not found.");
                    }
                    roles.add(adminRole.get());

                    break;
                default:
                    Optional<Role> userRole = roleRepository.findById(Long.valueOf(1));
                    if(!userRole.isPresent()){
                        new RuntimeException("Error: Role is not found.");
                    }
                    roles.add(userRole.get());
            }
        });

        newAccount.setRoles(roles);
        accountRepository.save(newAccount);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
