package com.example.hostelmanage.service;

import com.example.hostelmanage.model.Account;
import com.example.hostelmanage.repository.AccountRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Optional;

@Service
public class AccountService {

    @Inject
    private AccountRepository accountRepository;

    public Account getAccountById(Long Id) throws Exception {
        Optional<Account> account = accountRepository.findById(Id);
        if(!account.isPresent()) {
            throw new Exception("Account not found");
        }
        return  account.get();
    }

}
