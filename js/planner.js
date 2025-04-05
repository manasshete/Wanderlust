/**
 * Wanderlust Travel Website
 * Trip Planner page JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")
  
        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))
  
        // Add active class to current button and content
        this.classList.add("active")
        document.getElementById(tabId).classList.add("active")
      })
    })
  
    // Destination suggestions
    const destinationInput = document.getElementById("destination")
    const destinationSuggestions = document.getElementById("destinationSuggestions")
  
    if (destinationInput && destinationSuggestions) {
      // Sample destinations for suggestions
      const popularDestinations = [
        "Paris, France",
        "Bali, Indonesia",
        "Tokyo, Japan",
        "New York City, USA",
        "Rome, Italy",
        "Santorini, Greece",
        "Barcelona, Spain",
        "Maldives",
        "Cape Town, South Africa",
        "Rio de Janeiro, Brazil",
      ]
  
      destinationInput.addEventListener("focus", () => {
        showSuggestions(popularDestinations)
      })
  
      destinationInput.addEventListener("input", function () {
        const value = this.value.toLowerCase()
        if (value.length === 0) {
          showSuggestions(popularDestinations)
          return
        }
  
        const filteredDestinations = popularDestinations.filter((destination) =>
          destination.toLowerCase().includes(value),
        )
  
        showSuggestions(filteredDestinations)
      })
  
      // Hide suggestions when clicking outside
      document.addEventListener("click", (event) => {
        if (!event.target.closest("#destination") && !event.target.closest("#destinationSuggestions")) {
          destinationSuggestions.innerHTML = ""
        }
      })
  
      function showSuggestions(suggestions) {
        destinationSuggestions.innerHTML = ""
  
        if (suggestions.length === 0) {
          const noResults = document.createElement("div")
          noResults.className = "suggestion-item no-results"
          noResults.textContent = "No destinations found"
          destinationSuggestions.appendChild(noResults)
          return
        }
  
        suggestions.forEach((suggestion) => {
          const suggestionItem = document.createElement("div")
          suggestionItem.className = "suggestion-item"
          suggestionItem.textContent = suggestion
  
          suggestionItem.addEventListener("click", () => {
            destinationInput.value = suggestion
            destinationSuggestions.innerHTML = ""
          })
  
          destinationSuggestions.appendChild(suggestionItem)
        })
      }
    }
  
    // Date validation
    const startDateInput = document.getElementById("startDate")
    const endDateInput = document.getElementById("endDate")
  
    if (startDateInput && endDateInput) {
      // Set minimum date to today
      const today = new Date()
      const formattedToday = today.toISOString().split("T")[0]
      startDateInput.min = formattedToday
  
      startDateInput.addEventListener("change", function () {
        endDateInput.min = this.value
  
        // If end date is before start date, update it
        if (endDateInput.value && endDateInput.value < this.value) {
          endDateInput.value = this.value
        }
      })
    }
  
    // Generate itinerary button
    const generateItineraryBtn = document.getElementById("generateItinerary")
  
    if (generateItineraryBtn) {
      generateItineraryBtn.addEventListener("click", function () {
        const destination = destinationInput ? destinationInput.value : ""
        const startDate = startDateInput ? startDateInput.value : ""
        const endDate = endDateInput ? endDateInput.value : ""
  
        if (!destination || !startDate || !endDate) {
          alert("Please fill in all required fields (destination, start date, and end date).")
          return
        }
  
        // Show loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...'
        this.disabled = true
  
        // Simulate API call delay
        setTimeout(() => {
          generateSampleItinerary(destination, startDate, endDate)
  
          // Reset button
          this.innerHTML = "Generate Itinerary"
          this.disabled = false
  
          // Switch to itinerary tab
          document.querySelector('.tab-btn[data-tab="itinerary"]').click()
        }, 1500)
      })
    }
  
    // Function to generate a sample itinerary
    function generateSampleItinerary(destination, startDate, endDate) {
      const itineraryDays = document.getElementById("itineraryDays")
      if (!itineraryDays) return
  
      // Calculate number of days
      const start = new Date(startDate)
      const end = new Date(endDate)
      const dayDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
  
      itineraryDays.innerHTML = ""
  
      for (let i = 1; i <= dayDiff; i++) {
        const currentDate = new Date(start)
        currentDate.setDate(start.getDate() + i - 1)
        const formattedDate = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
  
        const dayCard = document.createElement("div")
        dayCard.className = "day-card"
        dayCard.setAttribute("data-day", i)
  
        let activitiesHTML = ""
  
        // Generate sample activities based on day number
        if (i === 1) {
          activitiesHTML = `
                      <div class="activity-card">
                          <div class="activity-time">09:00 AM</div>
                          <div class="activity-content">
                              <h4>Arrival and Check-in</h4>
                              <p>Arrive at ${destination} and check in to your accommodation.</p>
                              <div class="activity-meta">
                                  <span><i class="fas fa-map-marker-alt"></i> Airport/Hotel</span>
                                  <span><i class="fas fa-clock"></i> 2 hours</span>
                                  <span><i class="fas fa-dollar-sign"></i> $$</span>
                              </div>
                          </div>
                          <div class="activity-actions">
                              <button class="btn-icon"><i class="fas fa-edit"></i></button>
                              <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                          </div>
                      </div>
                      <div class="activity-card">
                          <div class="activity-time">12:00 PM</div>
                          <div class="activity-content">
                              <h4>Lunch at Local Restaurant</h4>
                              <p>Enjoy your first meal in ${destination} at a popular local restaurant.</p>
                              <div class="activity-meta">
                                  <span><i class="fas fa-map-marker-alt"></i> City Center</span>
                                  <span><i class="fas fa-clock"></i> 1.5 hours</span>
                                  <span><i class="fas fa-dollar-sign"></i> $$</span>
                              </div>
                          </div>
                          <div class="activity-actions">
                              <button class="btn-icon"><i class="fas fa-edit"></i></button>
                              <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                          </div>
                      </div>
                      <div class="activity-card">
                          <div class="activity-time">02:00 PM</div>
                          <div class="activity-content">
                              <h4>Orientation Walking Tour</h4>
                              <p>Get familiar with the area around your accommodation with a relaxed walking tour.</p>
                              <div class="activity-meta">
                                  <span><i class="fas fa-map-marker-alt"></i> Local Area</span>
                                  <span><i class="fas fa-clock"></i> 2 hours</span>
                                  <span><i class="fas fa-dollar-sign"></i> Free</span>
                              </div>
                          </div>
                          <div class="activity-actions">
                              <button class="btn-icon"><i class="fas fa-edit"></i></button>
                              <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                          </div>
                      </div>
                  `
        } else if (i === dayDiff) {
          activitiesHTML = `
                      <div class="activity-card">
                          <div class="activity-time">10:00 AM</div>
                          <div class="activity-content">
                              <h4>Souvenir Shopping</h4>
                              <p>Pick up some souvenirs to remember your trip to ${destination}.</p>
                              <div class="activity-meta">
                                  <span><i class="fas fa-map-marker-alt"></i> Shopping District</span>
                                  <span><i class="fas fa-clock"></i> 2 hours</span>
                                  <span><i class="fas fa-dollar-sign"></i> $-$$$</span>
                              </div>
                          </div>
                          <div class="activity-actions">
                              <button class="btn-icon"><i class="fas fa-edit"></i></button>
                              <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                          </div>
                      </div>
                      <div class="activity-card">
                          <div class="activity-time">01:00 PM</div>
                          <div class="activity-content">
                              <h4>Farewell Lunch</h4>
                              <p>Enjoy a final meal at one of the best restaurants in ${destination}.</p>
                              <div class="activity-meta">
                                  <span><i class="fas fa-map-marker-alt"></i> Recommended Restaurant</span>
                                  <span><i class="fas fa-clock"></i> 2 hours</span>
                                  <span><i class="fas fa-dollar-sign"></i> $$$</span>
                              </div>
                          </div>
                          <div class="activity-actions">
                              <button class="btn-icon"><i class="fas fa-edit"></i></button>
                              <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                          </div>
                      </div>
                      <div class="activity-card">
                          <div class="activity-time">04:00 PM</div>
                          <div class="activity-content">
                              <h4>Check-out and Departure</h4>
                              <p>Check out from your accommodation and head to the airport.</p>
                              <div class="activity-meta">
                                  <span><i class="fas fa-map-marker-alt"></i> Hotel/Airport</span>
                                  <span><i class="fas fa-clock"></i> 2 hours</span>
                                  <span><i class="fas fa-dollar-sign"></i> $$</span>
                              </div>
                          </div>
                          <div class="activity-actions">
                              <button class="btn-icon"><i class="fas fa-edit"></i></button>
                              <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                          </div>
                      </div>
                  `
        } else {
          activitiesHTML = `
                      <div class="empty-day">
                          <p>Activities for Day ${i} will be generated based on your preferences.</p>
                          <button class="add-activity-btn"><i class="fas fa-plus"></i> Add Activity</button>
                      </div>
                  `
        }
  
        dayCard.innerHTML = `
                  <div class="day-header">
                      <h3>Day ${i} - ${formattedDate}</h3>
                      <div class="day-actions">
                          <button class="btn-icon"><i class="fas fa-edit"></i></button>
                          <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                      </div>
                  </div>
                  <div class="day-activities" id="day${i}Activities">
                      ${activitiesHTML}
                      ${i !== 1 && i !== dayDiff ? '<button class="add-activity-btn"><i class="fas fa-plus"></i> Add Activity</button>' : ""}
                  </div>
              `
  
        itineraryDays.appendChild(dayCard)
      }
  
      // Add event listeners to the new add activity buttons
      document.querySelectorAll(".add-activity-btn").forEach((button) => {
        button.addEventListener("click", function () {
          const dayActivities = this.closest(".day-activities")
          const emptyDay = dayActivities.querySelector(".empty-day")
  
          if (emptyDay) {
            emptyDay.remove()
          }
  
          // Create a new activity form before the add button
          const activityForm = document.createElement("div")
          activityForm.className = "activity-form"
          activityForm.innerHTML = `
                      <h4>Add New Activity</h4>
                      <div class="form-group">
                          <label for="activityName">Activity Name</label>
                          <input type="text" id="activityName" placeholder="e.g., Visit Museum">
                      </div>
                      <div class="form-row">
                          <div class="form-group half">
                              <label for="activityTime">Time</label>
                              <input type="time" id="activityTime">
                          </div>
                          <div class="form-group half">
                              <label for="activityDuration">Duration</label>
                              <select id="activityDuration">
                                  <option value="0.5">30 minutes</option>
                                  <option value="1" selected>1 hour</option>
                                  <option value="1.5">1.5 hours</option>
                                  <option value="2">2 hours</option>
                                  <option value="3">3 hours</option>
                                  <option value="4">4 hours</option>
                                  <option value="5">5+ hours</option>
                              </select>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="activityLocation">Location</label>
                          <input type="text" id="activityLocation" placeholder="e.g., City Center">
                      </div>
                      <div class="form-group">
                          <label for="activityCost">Cost</label>
                          <select id="activityCost">
                              <option value="Free">Free</option>
                              <option value="$">$ (Budget)</option>
                              <option value="$$" selected>$$ (Moderate)</option>
                              <option value="$$$">$$$ (Expensive)</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="activityNotes">Notes</label>
                          <textarea id="activityNotes" placeholder="Additional details about this activity..."></textarea>
                      </div>
                      <div class="form-actions">
                          <button type="button" class="btn btn-secondary cancel-activity">Cancel</button>
                          <button type="button" class="btn btn-primary save-activity">Save Activity</button>
                      </div>
                  `
  
          this.parentNode.insertBefore(activityForm, this)
          this.style.display = "none"
  
          // Add event listeners to the form buttons
          activityForm.querySelector(".cancel-activity").addEventListener("click", () => {
            activityForm.remove()
            button.style.display = "flex"
          })
  
          activityForm.querySelector(".save-activity").addEventListener("click", () => {
            const name = activityForm.querySelector("#activityName").value
            const time = activityForm.querySelector("#activityTime").value
            const location = activityForm.querySelector("#activityLocation").value
            const cost = activityForm.querySelector("#activityCost").value
            const notes = activityForm.querySelector("#activityNotes").value
  
            if (!name || !time || !location) {
              alert("Please fill in all required fields.")
              return
            }
  
            // Format time for display
            const timeObj = new Date(`2000-01-01T${time}`)
            const formattedTime = timeObj.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
  
            // Create new activity card
            const activityCard = document.createElement("div")
            activityCard.className = "activity-card"
            activityCard.innerHTML = `
                          <div class="activity-time">${formattedTime}</div>
                          <div class="activity-content">
                              <h4>${name}</h4>
                              <p>${notes || "No additional details provided."}</p>
                              <div class="activity-meta">
                                  <span><i class="fas fa-map-marker-alt"></i> ${location}</span>
                                  <span><i class="fas fa-clock"></i> ${activityForm.querySelector("#activityDuration").value} hour(s)</span>
                                  <span><i class="fas fa-dollar-sign"></i> ${cost}</span>
                              </div>
                          </div>
                          <div class="activity-actions">
                              <button class="btn-icon"><i class="fas fa-edit"></i></button>
                              <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                          </div>
                      `
  
            // Add event listeners to the new activity card buttons
            activityCard.querySelector(".fa-trash-alt").parentElement.addEventListener("click", () => {
              if (confirm("Are you sure you want to delete this activity?")) {
                activityCard.remove()
              }
            })
  
            // Insert the new activity card before the form
            activityForm.parentNode.insertBefore(activityCard, activityForm)
  
            // Remove the form and show the add button again
            activityForm.remove()
            button.style.display = "flex"
          })
        })
      })
  
      // Update the map tab with the destination
      const itineraryMap = document.getElementById("itineraryMap")
      if (itineraryMap) {
        itineraryMap.innerHTML = `
                  <div class="map-placeholder">
                      <p>Interactive map for ${destination} would be displayed here.</p>
                      <p>This would show all activities and locations in your itinerary.</p>
                  </div>
              `
      }
  
      // Update the expenses tab
      updateExpensesChart()
    }
  
    // Function to update the expenses chart
    function updateExpensesChart() {
      const expenseChart = document.getElementById("expenseChart")
      if (!expenseChart) return
  
      expenseChart.innerHTML = `
              <div class="chart-placeholder">
                  <p>A pie chart showing your expense breakdown would be displayed here.</p>
                  <p>This would typically use a charting library like Chart.js.</p>
              </div>
          `
    }
  
    // Add Day button functionality
    const addDayBtn = document.getElementById("addDay")
    if (addDayBtn) {
      addDayBtn.addEventListener("click", () => {
        const itineraryDays = document.getElementById("itineraryDays")
        if (!itineraryDays) return
  
        const existingDays = itineraryDays.querySelectorAll(".day-card")
        const newDayNumber = existingDays.length + 1
  
        const dayCard = document.createElement("div")
        dayCard.className = "day-card"
        dayCard.setAttribute("data-day", newDayNumber)
  
        dayCard.innerHTML = `
                  <div class="day-header">
                      <h3>Day ${newDayNumber}</h3>
                      <div class="day-actions">
                          <button class="btn-icon"><i class="fas fa-edit"></i></button>
                          <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                      </div>
                  </div>
                  <div class="day-activities" id="day${newDayNumber}Activities">
                      <div class="empty-day">
                          <p>No activities planned for this day yet.</p>
                          <button class="add-activity-btn"><i class="fas fa-plus"></i> Add Activity</button>
                      </div>
                  </div>
              `
  
        itineraryDays.appendChild(dayCard)
  
        // Add event listener to the new add activity button
        const addActivityBtn = dayCard.querySelector(".add-activity-btn")
        addActivityBtn.addEventListener("click", function () {
          // Reuse the same functionality as other add activity buttons
          const event = new Event("click")
          this.dispatchEvent(event)
        })
  
        // Add event listener to the delete day button
        const deleteDayBtn = dayCard.querySelector(".fa-trash-alt").parentElement
        deleteDayBtn.addEventListener("click", () => {
          if (confirm("Are you sure you want to delete this day?")) {
            dayCard.remove()
  
            // Renumber the remaining days
            const remainingDays = itineraryDays.querySelectorAll(".day-card")
            remainingDays.forEach((day, index) => {
              const dayNumber = index + 1
              day.setAttribute("data-day", dayNumber)
              day.querySelector("h3").textContent = `Day ${dayNumber}`
              day.querySelector(".day-activities").id = `day${dayNumber}Activities`
            })
          }
        })
      })
    }
  
    // Save itinerary button functionality
    const saveItineraryBtn = document.getElementById("saveItinerary")
    if (saveItineraryBtn) {
      saveItineraryBtn.addEventListener("click", function () {
        // Show saving state
        const originalText = this.innerHTML
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...'
        this.disabled = true
  
        // Simulate saving delay
        setTimeout(() => {
          alert("Your itinerary has been saved successfully!")
  
          // Reset button
          this.innerHTML = originalText
          this.disabled = false
        }, 1000)
      })
    }
  
    // Initialize the itinerary map (placeholder)
    const itineraryMap = document.getElementById("itineraryMap")
    if (itineraryMap) {
      itineraryMap.innerHTML = `
              <div class="map-placeholder">
                  <p>Your itinerary map will appear here after you generate an itinerary.</p>
              </div>
          `
    }
  
    // Initialize the expense chart (placeholder)
    updateExpensesChart()
  
    // Add expense button functionality
    const addExpenseBtn = document.getElementById("addExpense")
    if (addExpenseBtn) {
      addExpenseBtn.addEventListener("click", () => {
        // Create modal for adding expense
        const modal = document.createElement("div")
        modal.className = "modal"
        modal.innerHTML = `
                  <div class="modal-content">
                      <span class="close-modal">&times;</span>
                      <h2>Add Expense</h2>
                      <div class="form-group">
                          <label for="expenseName">Expense Name</label>
                          <input type="text" id="expenseName" placeholder="e.g., Hotel Booking">
                      </div>
                      <div class="form-row">
                          <div class="form-group half">
                              <label for="expenseAmount">Amount</label>
                              <input type="number" id="expenseAmount" min="0" step="0.01" placeholder="0.00">
                          </div>
                          <div class="form-group half">
                              <label for="expenseCategory">Category</label>
                              <select id="expenseCategory">
                                  <option value="accommodation">Accommodation</option>
                                  <option value="transportation">Transportation</option>
                                  <option value="food">Food & Drinks</option>
                                  <option value="activities">Activities</option>
                                  <option value="shopping">Shopping</option>
                                  <option value="other">Other</option>
                              </select>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="expenseDate">Date</label>
                          <input type="date" id="expenseDate">
                      </div>
                      <div class="form-group">
                          <label for="expenseNotes">Notes</label>
                          <textarea id="expenseNotes" placeholder="Additional details about this expense..."></textarea>
                      </div>
                      <div class="form-actions">
                          <button type="button" class="btn btn-secondary cancel-expense">Cancel</button>
                          <button type="button" class="btn btn-primary save-expense">Save Expense</button>
                      </div>
                  </div>
              `
  
        document.body.appendChild(modal)
  
        // Show the modal
        setTimeout(() => {
          modal.style.opacity = "1"
        }, 10)
  
        // Close modal functionality
        const closeModal = modal.querySelector(".close-modal")
        const cancelBtn = modal.querySelector(".cancel-expense")
  
        function closeExpenseModal() {
          modal.style.opacity = "0"
          setTimeout(() => {
            modal.remove()
          }, 300)
        }
  
        closeModal.addEventListener("click", closeExpenseModal)
        cancelBtn.addEventListener("click", closeExpenseModal)
  
        // Save expense functionality
        const saveBtn = modal.querySelector(".save-expense")
        saveBtn.addEventListener("click", () => {
          const name = modal.querySelector("#expenseName").value
          const amount = modal.querySelector("#expenseAmount").value
          const category = modal.querySelector("#expenseCategory").value
  
          if (!name || !amount) {
            alert("Please fill in all required fields.")
            return
          }
  
          // Simulate saving the expense
          alert(`Expense "${name}" for $${amount} has been added to your trip budget.`)
  
          // Update the expenses chart (in a real app, this would reflect the new data)
          updateExpensesChart()
  
          // Close the modal
          closeExpenseModal()
        })
      })
    }
  
    // Share/Sell tab functionality
    const copyLinkBtn = document.querySelector(".btn-social.link")
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener("click", function () {
        // Create a dummy input to copy the URL
        const dummy = document.createElement("input")
        document.body.appendChild(dummy)
        dummy.value = window.location.href
        dummy.select()
        document.execCommand("copy")
        document.body.removeChild(dummy)
  
        // Show feedback
        const originalText = this.innerHTML
        this.innerHTML = '<i class="fas fa-check"></i> Copied!'
  
        setTimeout(() => {
          this.innerHTML = originalText
        }, 2000)
      })
    }
  
    // List for sale button functionality
    const listForSaleBtn = document.getElementById("listForSale")
    if (listForSaleBtn) {
      listForSaleBtn.addEventListener("click", function () {
        const price = document.getElementById("sellPrice").value
        const description = document.getElementById("sellDescription").value
  
        if (!price || !description) {
          alert("Please fill in all required fields.")
          return
        }
  
        // Show loading state
        const originalText = this.innerHTML
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
        this.disabled = true
  
        // Simulate processing delay
        setTimeout(() => {
          alert("Your itinerary has been listed for sale successfully!")
  
          // Reset button
          this.innerHTML = originalText
          this.disabled = false
        }, 1500)
      })
    }
  })
  
  