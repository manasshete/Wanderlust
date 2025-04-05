/**
 * Wanderlust Travel Website
 * Destinations page JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
    // Sample destination data (in a real application, this would come from a server)
    const destinations = [
      {
        id: "paris",
        name: "Paris, France",
        image: "images/paris.jpg",
        region: "europe",
        activities: ["culture", "urban"],
        budget: "moderate",
        duration: "short",
        rating: 4.6,
        description: "Experience the romance and charm of the City of Lights.",
      },
      {
        id: "bali",
        name: "Bali, Indonesia",
        image: "images/bali.jpg",
        region: "asia",
        activities: ["beach", "culture", "nature"],
        budget: "budget",
        duration: "long",
        rating: 4.8,
        description: "Discover tropical paradise with rich culture and stunning landscapes.",
      },
      {
        id: "santorini",
        name: "Santorini, Greece",
        image: "images/santorini.jpg",
        region: "europe",
        activities: ["beach", "culture"],
        budget: "luxury",
        duration: "short",
        rating: 4.9,
        description: "Enjoy breathtaking sunsets and iconic white and blue architecture.",
      },
      {
        id: "kyoto",
        name: "Kyoto, Japan",
        image: "images/kyoto.jpg",
        region: "asia",
        activities: ["culture", "nature"],
        budget: "moderate",
        duration: "short",
        rating: 4.7,
        description: "Immerse yourself in traditional Japanese culture and beautiful temples.",
      },
      {
        id: "costa-rica",
        name: "Costa Rica",
        image: "images/costa-rica.jpg",
        region: "americas",
        activities: ["adventure", "nature"],
        budget: "moderate",
        duration: "long",
        rating: 4.7,
        description: "Experience the perfect blend of adventure and natural beauty.",
      },
      {
        id: "cape-town",
        name: "Cape Town, South Africa",
        image: "images/cape-town.jpg",
        region: "africa",
        activities: ["adventure", "urban", "nature"],
        budget: "moderate",
        duration: "long",
        rating: 4.6,
        description: "Discover stunning landscapes, wildlife, and vibrant city life.",
      },
      {
        id: "new-york",
        name: "New York City, USA",
        image: "images/new-york.jpg",
        region: "americas",
        activities: ["urban", "culture"],
        budget: "luxury",
        duration: "short",
        rating: 4.5,
        description: "Explore the vibrant metropolis that never sleeps.",
      },
      {
        id: "sydney",
        name: "Sydney, Australia",
        image: "images/sydney.jpg",
        region: "oceania",
        activities: ["beach", "urban"],
        budget: "luxury",
        duration: "extended",
        rating: 4.7,
        description: "Experience the perfect blend of city life and beautiful beaches.",
      },
      {
        id: "marrakech",
        name: "Marrakech, Morocco",
        image: "images/marrakech.jpg",
        region: "africa",
        activities: ["culture", "adventure"],
        budget: "budget",
        duration: "short",
        rating: 4.5,
        description: "Get lost in the colorful markets and rich cultural heritage.",
      },
      {
        id: "maldives",
        name: "Maldives",
        image: "images/maldives.jpg",
        region: "asia",
        activities: ["beach", "luxury"],
        budget: "luxury",
        duration: "short",
        rating: 4.9,
        description: "Relax in overwater bungalows in this tropical paradise.",
      },
      {
        id: "rome",
        name: "Rome, Italy",
        image: "images/rome.jpg",
        region: "europe",
        activities: ["culture", "urban"],
        budget: "moderate",
        duration: "short",
        rating: 4.7,
        description: "Step back in time and explore the ancient wonders of the Eternal City.",
      },
      {
        id: "rio",
        name: "Rio de Janeiro, Brazil",
        image: "images/rio.jpg",
        region: "americas",
        activities: ["beach", "adventure", "urban"],
        budget: "moderate",
        duration: "long",
        rating: 4.6,
        description: "Experience the vibrant culture, stunning beaches, and breathtaking views.",
      },
    ]
  
    const destinationsContainer = document.getElementById("destinationsContainer")
    const loadingIndicator = document.getElementById("loadingIndicator")
    const noResults = document.getElementById("noResults")
    const pagination = document.getElementById("pagination")
    const applyFiltersBtn = document.getElementById("applyFilters")
    const resetFiltersBtn = document.getElementById("resetFilters")
  
    // Filter elements
    const regionFilter = document.getElementById("region")
    const activityFilter = document.getElementById("activity")
    const budgetFilter = document.getElementById("budget")
    const durationFilter = document.getElementById("duration")
  
    let currentPage = 1
    const destinationsPerPage = 6
    let filteredDestinations = [...destinations]
  
    // Function to render destination cards
    function renderDestinations(destinationsToRender) {
      if (!destinationsContainer) return
  
      destinationsContainer.innerHTML = ""
  
      if (destinationsToRender.length === 0) {
        if (noResults) noResults.classList.remove("hidden")
        return
      }
  
      if (noResults) noResults.classList.add("hidden")
  
      destinationsToRender.forEach((destination) => {
        const card = document.createElement("div")
        card.className = "destination-card"
  
        card.innerHTML = `
                  <img src="${destination.image}" alt="${destination.name}">
                  <div class="destination-info">
                      <h3>${destination.name}</h3>
                      <div class="destination-meta">
                          <span><i class="fas fa-star"></i> ${destination.rating}</span>
                          <span><i class="fas fa-tag"></i> ${capitalizeFirstLetter(destination.budget)}</span>
                      </div>
                      <p>${destination.description}</p>
                      <a href="destination-detail.html?id=${destination.id}" class="btn btn-sm">View Details</a>
                  </div>
              `
  
        destinationsContainer.appendChild(card)
      })
    }
  
    // Function to render pagination
    function renderPagination() {
      if (!pagination) return
  
      pagination.innerHTML = ""
  
      const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage)
  
      if (totalPages <= 1) return
  
      // Previous button
      if (currentPage > 1) {
        const prevButton = document.createElement("button")
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>'
        prevButton.addEventListener("click", () => {
          currentPage--
          updateDestinations()
        })
        pagination.appendChild(prevButton)
      }
  
      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button")
        pageButton.textContent = i
        if (i === currentPage) {
          pageButton.classList.add("active")
        }
        pageButton.addEventListener("click", () => {
          currentPage = i
          updateDestinations()
        })
        pagination.appendChild(pageButton)
      }
  
      // Next button
      if (currentPage < totalPages) {
        const nextButton = document.createElement("button")
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>'
        nextButton.addEventListener("click", () => {
          currentPage++
          updateDestinations()
        })
        pagination.appendChild(nextButton)
      }
    }
  
    // Function to update destinations based on current page and filters
    function updateDestinations() {
      if (loadingIndicator) loadingIndicator.classList.remove("hidden")
      if (destinationsContainer) destinationsContainer.innerHTML = ""
  
      // Simulate loading delay
      setTimeout(() => {
        const startIndex = (currentPage - 1) * destinationsPerPage
        const endIndex = startIndex + destinationsPerPage
        const paginatedDestinations = filteredDestinations.slice(startIndex, endIndex)
  
        renderDestinations(paginatedDestinations)
        renderPagination()
  
        if (loadingIndicator) loadingIndicator.classList.add("hidden")
      }, 500)
    }
  
    // Function to apply filters
    function applyFilters() {
      const region = regionFilter ? regionFilter.value : "all"
      const activity = activityFilter ? activityFilter.value : "all"
      const budget = budgetFilter ? budgetFilter.value : "all"
      const duration = durationFilter ? durationFilter.value : "all"
  
      filteredDestinations = destinations.filter((destination) => {
        // Region filter
        if (region !== "all" && destination.region !== region) return false
  
        // Activity filter
        if (activity !== "all" && !destination.activities.includes(activity)) return false
  
        // Budget filter
        if (budget !== "all" && destination.budget !== budget) return false
  
        // Duration filter
        if (duration !== "all" && destination.duration !== duration) return false
  
        return true
      })
  
      currentPage = 1
      updateDestinations()
    }
  
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  
    // Initialize the page
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener("click", applyFilters)
    }
  
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", () => {
        if (regionFilter) regionFilter.value = "all"
        if (activityFilter) activityFilter.value = "all"
        if (budgetFilter) budgetFilter.value = "all"
        if (durationFilter) durationFilter.value = "all"
  
        filteredDestinations = [...destinations]
        currentPage = 1
        updateDestinations()
      })
    }
  
    // Initialize map (placeholder for actual map implementation)
    const worldMap = document.getElementById("worldMap")
    if (worldMap) {
      worldMap.innerHTML = `
              <div class="map-placeholder">
                  <p>Interactive world map would be loaded here with markers for all destinations.</p>
                  <p>This would typically use a mapping library like Google Maps, Mapbox, or Leaflet.</p>
              </div>
          `
    }
  
    // Initial load
    updateDestinations()
  })
  
  