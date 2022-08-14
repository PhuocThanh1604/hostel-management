package com.example.hostelmanage.controller;

import com.example.hostelmanage.model.Account;
import com.example.hostelmanage.repository.AccountRepository;
import com.example.hostelmanage.repository.ProfileRepository;
import com.example.hostelmanage.repository.RoleRepository;
import com.example.hostelmanage.service.AccountService;
import com.example.hostelmanage.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Optional;

@RestController
@RequestMapping(path = "/account")
public class AccountController {

    @Inject
    public AccountRepository accountRepository;

    @Inject
    public ProfileRepository profileRepository;

    @Inject
    public RoleRepository roleRepository;

    @Inject
    private PasswordEncoder passwordEncoder;

    @Inject
    private JwtService jwtService;

    @Inject
    private AccountService accountService;


    @PutMapping("/update")
    @PreAuthorize("hasRole('USER')")
    public  ResponseEntity<?> updateAccount( @RequestBody Account account) throws Exception {

        /* There are 4 step to dynamic update a entity
        * Step 1: Find account by ID with Optional<T>
        * Step 2: Get profile ID from account which we find out before
        * Step 3: Find profile by profile ID in step 2 with Optional<T>
        * Step 4: Setter them
        * */

        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Account> accountPresent = accountRepository.findAccountByEmail(email);
        Account thisAccount = accountPresent.get();

        thisAccount.getProfile().setCardNumber(account.getProfile().getCardNumber());
        thisAccount.getProfile().setFullName(account.getProfile().getFullName());
        thisAccount.setPhone(account.getPhone());

        accountRepository.save(thisAccount);

        return new ResponseEntity<>(thisAccount, HttpStatus.OK);

    }


    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAccountByEmail() throws Exception {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Account> account = accountRepository.findAccountByEmail(email);

        if(!account.isPresent()){
            throw new Exception("Account not found");
        }

        Account thisAcccount = account.get();

        return new ResponseEntity<>(thisAcccount, HttpStatus.OK);

    }


}
