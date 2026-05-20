package com.warsawbeauty.backend.controller

import com.warsawbeauty.backend.model.Salon
import com.warsawbeauty.backend.repository.SalonRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/salons")
@CrossOrigin(origins = ["http://localhost:3000"])
class SalonController(private val repository: SalonRepository) {

    @GetMapping
    fun getAllSalons(): List<Salon> = repository.findAll()

    @GetMapping("/{id}")
    fun getSalonById(@PathVariable id: Long): ResponseEntity<Salon> {
        return repository.findById(id)
            .map { ResponseEntity.ok(it) }
            .orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("/{id}")
    fun updateSalon(@PathVariable id: Long, @RequestBody updatedSalon: Salon): ResponseEntity<Salon> {
        return repository.findById(id).map { existing ->
            existing.name = updatedSalon.name
            existing.address = updatedSalon.address
            existing.district = updatedSalon.district
            existing.phoneNumber = updatedSalon.phoneNumber
            existing.website = updatedSalon.website
            existing.services = updatedSalon.services
            existing.priceRange = updatedSalon.priceRange
            ResponseEntity.ok(repository.save(existing))
        }.orElse(ResponseEntity.notFound().build())
    }
}