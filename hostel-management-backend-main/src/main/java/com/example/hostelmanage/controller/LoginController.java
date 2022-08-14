package com.example.hostelmanage.controller;

import com.example.hostelmanage.domain.AccountCredentials;
import com.example.hostelmanage.model.Account;
import com.example.hostelmanage.repository.AccountRepository;
import com.example.hostelmanage.service.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.Optional;

@RestController
public class LoginController {

    @Inject
    private JwtService jwtService;

    @Inject
    private AccountRepository accountRepository;

    @Inject
    AuthenticationManager authenticationManager;

    @Inject
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<Account> getToken(@RequestBody AccountCredentials credentials) {
        Optional<Account> account = accountRepository.findAccountByEmail(credentials.getEmail());

        if(!account.isPresent()){
            return new ResponseEntity<>(HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }

        Account thisAccount = account.get();

        UsernamePasswordAuthenticationToken creds =
                new UsernamePasswordAuthenticationToken(
                        credentials.getEmail(),
                        credentials.getPassword());
        System.out.println("Creds: " + creds);
        Authentication auth = authenticationManager.authenticate(creds);

        System.out.println("Authentication: " + auth);

        // Generate token
        String jwts = jwtService.generateJwtToken(auth);

        // Build response with the generated token
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .body(thisAccount);

    }

}
