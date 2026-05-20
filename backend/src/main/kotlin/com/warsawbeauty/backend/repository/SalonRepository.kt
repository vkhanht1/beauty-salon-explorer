package com.warsawbeauty.backend.repository

import com.warsawbeauty.backend.model.Salon
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SalonRepository : JpaRepository<Salon, Long>