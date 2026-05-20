package com.warsawbeauty.backend.model

import jakarta.persistence.*

@Entity
@Table(name = "salon")
data class Salon(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var name: String = "",
    var address: String = "",
    var district: String = "",

    @Column(name = "phone_number")
    var phoneNumber: String? = null,

    var website: String? = null,
    var services: String? = null,

    @Column(name = "price_range")
    var priceRange: String? = null,

    var rating: Double? = null,

    @Column(name = "number_of_reviews")
    var numberOfReviews: Int? = null
)