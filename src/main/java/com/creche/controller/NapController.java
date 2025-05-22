package com.creche.controller;

import com.creche.model.Nap;
import com.creche.repository.NapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/naps")
public class NapController {
    @Autowired
    private NapRepository napRepository;

    @GetMapping
    public List<Nap> getNaps(@RequestParam LocalDate date) {
        return napRepository.findByDate(date);
    }

    @PostMapping
    public List<Nap> saveNaps(@RequestBody List<Nap> naps) {
        return napRepository.saveAll(naps);
    }
}
