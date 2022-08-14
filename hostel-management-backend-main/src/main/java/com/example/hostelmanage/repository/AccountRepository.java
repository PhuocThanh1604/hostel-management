package com.example.hostelmanage.repository;

import com.example.hostelmanage.model.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AccountRepository extends CrudRepository<Account, Long> {


    @Query(value = "SELECT a FROM Account a WHERE a.email LIKE ?1")
    Optional<Account> findAccountByEmail(String email);

}
