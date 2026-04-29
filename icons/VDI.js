document.addEventListener("click", function (e) {
    if (e.target.classList.contains("dropdown-item")) {
        const value = e.target.getAttribute("data-value");
        
        // If already selected, prevent deselection
        if (selectedValues.includes(value)) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
    }
});



document.addEventListener("click", function (e) {
    if (e.target.classList.contains("dropdown-item")) {
        setTimeout(function () {
            const dropdown = document.querySelector(".dropdown-menu");
            dropdown.scrollTop = 0;
            console.log("scrollTop reset:", dropdown.scrollTop); // confirm in console
        }, 100); // increased to 100ms to wait for Bootstrap
    }
});



document.querySelector(".dropdown-menu").addEventListener("click", function (e) {
    if (e.target.classList.contains("dropdown-item")) {
        setTimeout(function () {
            document.querySelector(".dropdown-menu").scrollTop = 0;
        }, 0);
    }
});


<div class="row2 singleRow" id="deliveryField_fulfillment">
                                            <dl class="fulfillmentField_content">
                                                <dt>Fulfillment<span class="mandatory_appointment">*</span></dt>
                                                <div class="dropdown">
                                                    <button id="dropdownButton"
                                                        class="btn btn-custom-select d-flex align-items-center mandatory_editableFields justify-content-between multiselect_field"
                                                        type="button" data-bs-toggle="dropdown" onchange="checkFulfillment()"
                                                            id="fulfillmentField">
                                                        <span class="selected-container"
                                                            onkeydown="handleTabFulfillment(event)">Select</span>
                                                        <i class="fa-solid fa-chevron-down ms-2"></i>
                                                    </button>

                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item" href="#"
                                                                data-value="Option 1">Option 1</a></li>
                                                        <li><a class="dropdown-item" href="#"
                                                                data-value="Option 2">Option 2</a></li>
                                                        <li><a class="dropdown-item" href="#"
                                                                data-value="Option 3">Option 3</a></li>
                                                        <li><a class="dropdown-item" href="#"
                                                                data-value="Option 4">Option 4</a></li>
                                                        <li><a class="dropdown-item" href="#"
                                                                data-value="Option 5">Option 5</a></li>
                                                    </ul>
                                                </div>
                                                <!-- <div class="select-box">
                                                    <select class="dropdown-field form-select mandatory_editableFields"
                                                        aria-label="Default select example" title="Select"
                                                        id="fulfillmentField" onchange="checkFulfillment()">
                                                        <option disabled hidden selected>Select</option>
                                                        <option>Label</option>
                                                        <option>Label</option>
                                                    </select>
                                                </div> -->
                                                <div class="maxCount_info">Select a maximum of 3 request</div>
                                                <div class="warning_text" id="fulfillment_mandatoryText">This
                                                    field is required
                                                </div>
                                            </dl>
                                        </div>


document.querySelector(".dropdown-menu").addEventListener("click", function (e) {
    if (e.target.tagName === "LI" || e.target.tagName === "A" || e.target.tagName === "INPUT") {
        setTimeout(function () {
            document.querySelector(".dropdown-menu.show").scrollTop = 0;
        }, 0);
    }
});


document.addEventListener("change", function (e) {
    if (e.target.closest(".fulfillmentField_content")) {
        const dropdown = document.querySelector(".dropdown-menu.show");
        if (dropdown) {
            dropdown.scrollTop = 0; // scroll to top after selection
        }
    }
});


document.addEventListener("change", function (e) {
    if (e.target.closest(".fulfillmentField_content")) {
        if (selectedValues.length === 0) {
            showError("fulfillment_mandatoryText", "dropdownButton");
        } else {
            const el = document.getElementById("fulfillment_mandatoryText");
            if (el) el.style.display = "none";
            $("#dropdownButton").removeClass("warningBorder");
        }
    }
});


document
  .querySelector(".save_btn_fulfillment")
  .addEventListener("click", function (e) {

    e.preventDefault(); // stop submit
    hideAllErrors();

    let isValid = true;

    /* -----------------------------
       Delivery Method (REQUIRED)
    ----------------------------- */
    const delivery = document.getElementById("deliveryField").value;
    if (!delivery || delivery === "Select") {
        showError("delivery_mandatoryText","deliveryField");
        isValid = false;
    }

    /* -----------------------------
       Fulfillment (REQUIRED, max 3)
    ----------------------------- */
    

    if (selectedValues.length==0) {
        showError("fulfillment_mandatoryText","dropdownButton");
        isValid = false;
    } 

    /* -----------------------------
       Email Validation
    ----------------------------- */
    if (delivery === "Email") {
        const emailType = document.querySelector(".sendtoEmail:checked");

        if (!emailType) {
            showError("emailField_mandatory","email");
            isValid = false;
        }

        if (emailType && emailType.value === "NewEmailID") {
            const email = document.getElementById("email").value.trim();
			if (!isValidEmail(email)) {
			               const msg = document.getElementById("validation-message");
			               msg.style.display = "block";
							showError("emailField_mandatory","email");
			                isValid = false;
			            }
        }
    }

    /* -----------------------------
       Mail Validation
    ----------------------------- */
    if (delivery === "Mail") {debugger;
        const mailType = document.querySelector(".sendtoMail:checked");

        if (!mailType) {
            showError("mailSelection_mandatory");
            isValid = false;
        }

        if (mailType && mailType.value === "NewMailingAddress") {
            isValid &= validateField("firstName", "firstName_mandatory");
            isValid &= validateField("lastName", "lastName_mandatory");
            isValid &= validateField("street_fulfillment", "street_mandatory_fulfillment");
            isValid &= validateField("zipcodeFulfillment", "zipcodeFulfillment_mandatory");
            isValid &= validateSelect("cityFulfillment", "cityFulfillment_mandatory");
            isValid &= validateSelect("stateFulfillment_field", "stateFulfillment_mandatory");
        }
    }

    /* -----------------------------
       Final Submit
    ----------------------------- */
    if (!isValid) {
        document.getElementById("mandatoryfields_toast_fulfillment").style.display = "block";
        scrollToFirstError();
        return;
    }
	
	createFulfillment();

   
});


function hideAllErrors() {
    document
        .querySelectorAll(".warning_text")
        .forEach(el => el.style.display = "none");

    document.getElementById("mandatoryfields_toast_fulfillment").style.display = "none";
	
}

function showError(id,fieldId) {
    const el = document.getElementById(id);
    if (el) el.style.display = "block";
	$("#"+fieldId).addClass("warningBorder");
}

function validateField(inputId, errorId) {
    const value = document.getElementById(inputId).value.trim();
    if (!value) {
        showError(errorId,inputId);
        return false;
    }
    return true;
}

function validateSelect(selectId, errorId) {
    const value = document.getElementById(selectId).value;
    if (!value || value === "Select") {
        showError(errorId,selectId);
        return false;
    }
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function scrollToFirstError() {
    const firstError = document.querySelector(".warning_text[style*='block']");
    if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}





& .main {
        & .fulfillmentField_content {
            & ul {
                &.dropdown-menu {
                    height: auto;
                    max-height: 160px;
                    width: 100% !important;
                    background: #fff;
                    overflow-x: hidden;
                    overflow-y: auto;
                    list-style: none;
                    border: 1px solid #888888;
                    position: absolute !important;
                    top: -14px !important;
                    left: 0 !important;
                    padding-left: 0px;
                    z-index: 9;
                    box-shadow: none;
                }


document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal-content');
    if (modal) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}, true);

function adjustDropdownSize() {
  const btn = document.getElementById("dropdownButton");
  const container = btn.querySelector(".selected-container");

  if (!btn || !container) return;

  // Reset first
  btn.style.height = "auto";

  // Calculate needed height
  const newHeight = container.scrollHeight;

  // Apply height with small padding buffer
  btn.style.height = (newHeight + 12) + "px";
}

function renderSelected() {
  if (selectedValues.length > 0) {
    selectedContainer.innerHTML = selectedValues.map(v => `
      <span class="selected-item">
        ${v} 
        <span class="remove-icon" data-value="${v}">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </span>
    `).join("");

    $('#dropdownButton').removeClass('warningBorder');
    $('#fulfillment_mandatoryText').hide();

  } else {
    selectedContainer.textContent = "Select";
  }

  // ✅ ADD THIS LINE
  adjustDropdownSize();
}

/* Default dropdown item style */
.dropdown-menu .dropdown-item {
  color: black;
  background-color: white;
}

/* Hover state */
.dropdown-menu .dropdown-item:hover {
  color: white;
  background-color: blue;
}

/* Optional: when focused (keyboard navigation) */
.dropdown-menu .dropdown-item:focus {
  color: white;
  background-color: blue;
}



/* Make the dropdown button flexible */
#dropdownButton {
  min-height: 40px;
  height: auto;              /* allow expansion */
  display: flex;
  align-items: center;
  flex-wrap: wrap;           /* allow items to wrap */
  padding: 6px 10px;
}

/* Container that holds selected items */
#dropdownButton .selected-container {
  display: flex;
  flex-wrap: wrap;           /* wrap to next line */
  gap: 6px;
  width: 100%;
}

/* Each selected item */
.selected-item {
  display: inline-flex;
  align-items: center;
  background: #f1f1f1;
  padding: 4px 8px;
  border-radius: 4px;
  max-width: 100%;
  word-break: break-word;    /* break long text */
}

/* Cross icon spacing */
.remove-icon {
  margin-left: 6px;
  cursor: pointer;
}


if (selectedValues.length > 0) {
  selectedContainer.innerHTML = selectedValues.map(v => `
    <span class="selected-item">
      ${v} 
      <span class="remove-icon" data-value="${v}">
        <i class="fa fa-times" aria-hidden="true"></i>
      </span>
    </span>
  `).join("");

  $('#dropdownButton').removeClass('warningBorder');
  $('#fulfillment_mandatoryText').hide();

} else {
  selectedContainer.textContent = "Select";
}



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">


$(document).ready(function () {
  const $drawer = $('#drawer');
  const $openButton = $('#open-drawer-button');
  const $closeButtonAppointments = $('#close-drawer-button');

  function openDrawer() {
    $drawer.addClass('open');
    // Adds class to body
    $('body').addClass('no-scroll');
  }

  function closeDrawer() {
    $drawer.removeClass('open');
    // Removes class from body
    $('body').removeClass('no-scroll');
  }

  $openButton.on('click', openDrawer);
  $closeButtonAppointments.on('click', closeDrawer);

  $('.yesBtn').on('click', function () {
    closeDrawer();

    $("#cancel_popup_add_opportunity").hide();

  });
});
$("#mandatoryfields_toast_fulfillment").hide();
$("#success_toastmsg_fulfillment").hide();
$("#cancelledChanges_fulfillment").hide();
$("#deliveryField_fulfillment").hide();
$(".email-details").hide();
$(".currentAddress").hide();
/*Save Btn flow*/
// $(".save_btn_fulfillment").click(function () {
//   $(".warning_text").show();
//   $(".mandatory_editableFields").addClass("warningBorder");
//   $("#mandatoryfields_toast_fulfillment").show();  
// })
$('.save_btn_fulfillment').on('click', function (e) {
  let isValid = true;

  // Reset previous validation states
  $('.is-invalid, .is-invalid-select').removeClass('warningBorder');
  $('.warning_text').hide();

  // 1. Check Inputs (Text, Date)
  $('.mandatory_editableFields').each(function () {
    if ($(this).is('input') && $(this).val().trim() === "") {
      $(this).addClass('warningBorder');
      $(this).siblings('.warning_text').show();
      isValid = false;
    }
  });

  // 2. Check Bootstrap-Select Dropdowns
  $('select.mandatory_editableFields').each(function () {
    if ($(this).val() === "" || $(this).val() === null) {
      // Highlight the plugin's button toggle
      $(this).addClass('warningBorder');
      // $(".cityFulfillment_content select").removeClass("warningBorder");
      $(this).parent().siblings('.warning_text').show();
      isValid = false;
    }
  });

  $('button.mandatory_editableFields').each(function () {
    if ($(this).val() === "" || $(this).val() === null) {
      // Highlight the plugin's button toggle
      $(this).addClass('warningBorder');
      // $(".cityFulfillment_content select").removeClass("warningBorder");
      $(this).parent().siblings('.warning_text').show();
      isValid = false;
    }
  });

  // Target the button and its text container
  var $dropdownBtn = $('#dropdownButton');
  var selectedValue = $dropdownBtn.find('.selected-container').text().trim();

  // Check if the text is still the default "Select"
  if (selectedValue === "Select" || selectedValue === "") {
    console.log(selectedValue)
    $dropdownBtn.addClass('warningBorder'); // Add red border
    $('#fulfillment_mandatoryText').show();      // Show warning text
    isValid = false;
  }
  else {
    // If an option IS selected, ensure error is hidden (validation pass)
    $('#dropdownButton').removeClass('warningBorder');
    $('#fulfillment_mandatoryText').hide();
  }

  if (!isValid) {
    e.preventDefault(); // Stop submission
  }
  // $('.dropdown-menu .dropdown-item').on('click', function () {
  //   var pickedValue = $(this).data('value');

  //   // Update the button text
  //   $('#dropdownButton .selected-container').text(pickedValue);

  //   // Remove error styling immediately
  //   $('#dropdownButton').removeClass('warningBorder');
  //   $('#fulfillment_mandatoryText').hide();
  // });
});

/*Close Drawer*/
$("#close-drawer-button, #cancelChanges_fulfillment").click(function () {
  $(".warning_text").hide();
  $("#email").val('');
   const emailInput = $("#email").val();
    const messageSpan = $('#validation-message');
    console.log(emailInput);
    if (emailInput.length === 0) {
      messageSpan.text(' ');
    }
  $(".mandatory_editableFields").removeClass("warningBorder");
  $("#mandatoryfields_toast_fulfillment").hide();
  $("#deliveryField_fulfillment").hide();
  $(".email-details").hide();
  $(".currentAddress").hide();
  $(".mail_content").hide();
  $(".email_content").hide();
  $('input[name="sendtoEmail"]').prop('checked', false);
  $('input[name="sendtoMail"]').prop('checked', false);
  $('#deliveryField').val('');
  $('#deliveryField').val('Select');
  $('#cityFulfillment').val('');
  $('#cityFulfillment').val('Select');
  $('#stateFulfillment_field').val('');
  $('#stateFulfillment_field').val('Select');
  $("#zipcodeFulfillment").val('');
  $("#street_fulfillment").val('');
  selectedValues = []; //reset internal state properly
  renderSelected(); //re-render UI correctly

})
/*Delivery Flow*/
$(".email_content").hide();
$(".mail_content").hide();
$('#deliveryField').change(function () {
  if ($(this).val() === "Email") {
    console.log($(this).val())
    $(".email_content").show();
    $(".mail_content").hide();
    $(".email-details").hide();
    $("#deliveryField_fulfillment").show();
    $('input[name="sendtoEmail"]').prop('checked', false);
    $('input[name="sendtoMail"]').prop('checked', false);
    $(".currentAddress").hide();
    $('#cityFulfillment').val('');
    $('#cityFulfillment').val('Select');
    $('#stateFulfillment_field').val('');
    $('#stateFulfillment_field').val('Select');
    $("#zipcodeFulfillment").val('');
    $("#street_fulfillment").val('');
    $("#email").val('');
   const emailInput = $("#email").val();
    const messageSpan = $('#validation-message');
    console.log(emailInput);
    if (emailInput.length === 0) {
      messageSpan.text(' ');
    }
  }
  else {
    $(".email_content").hide();
    $(".mail_content").show();
    $("#deliveryField_fulfillment").show();
    $('input[name="sendtoEmail"]').prop('checked', false);
    $('input[name="sendtoMail"]').prop('checked', false);
    $(".currentAddress").hide();
    $('#cityFulfillment').val('');
    $('#cityFulfillment').val('Select');
    $('#stateFulfillment_field').val('');
    $('#stateFulfillment_field').val('Select');
    $("#zipcodeFulfillment").val('');
    $("#street_fulfillment").val('');

  }
})
$('input[name="sendtoEmail"]').change(function () {
  if ($(this).val() == "CurrentEmail") {
    $(".currentEmail_content").show();
    $(".newEmail_content").hide();
    $(".email-details").show();
    $("#email").val('');
    const emailInput = $("#email").val();
    const messageSpan = $('#validation-message');
    console.log(emailInput);
    if (emailInput.length === 0) {
      messageSpan.text(' ');
    }
  }
  else {
    $(".newEmail_content").show();
    $(".currentEmail_content").hide();
    $(".email-details").show();
    $('#email').on('keyup', function () {
      // Get the value of the input field
      const emailInput = $(this).val();
      const messageSpan = $('#validation-message');

      // Regular expression for basic email validation
      // This pattern checks for a valid format (e.g., name@domain.com)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (emailInput.length === 0) {
        // Clear message if the field is empty
        messageSpan.text('');
      }
      else if (emailRegex.test(emailInput)) {
        // Valid email format
        messageSpan.text(' ');
      }
      else {
        // Invalid email format
        messageSpan.text('Enter a valid email address.');
      }
    });
  }
});
$('input[name="sendtoMail"]').change(function () {
  if ($(this).val() == "CurrentMailingAddress") {
    $(".current_mailingAddress").show();
    $(".mailingAddress").hide();
    $(".currentAddress").show();
    $('#cityFulfillment').val('');
    $('#cityFulfillment').val('Select');
    $('#stateFulfillment_field').val('');
    $('#stateFulfillment_field').val('Select');
    $("#zipcodeFulfillment").val('');
    $("#street_fulfillment").val('');
    $(".warning_text").hide();
    $(".mandatory_editableFields").removeClass("warningBorder");
    $("#mandatoryfields_toast_fulfillment").hide();
  } else {
    $(".mailingAddress").show();
    $(".current_mailingAddress").hide();
    $(".currentAddress").show();
  }
});
// Tooltip of the info icon
$('#mailInfo_icon').hover(function () {
  $("#mail_tooltip").show();
}, function () {
  $("#mail_tooltip").hide();
});
//Zipcode 
$('#zipcodeFulfillment').on('input', function () {
  // Remove any character that is NOT a digit (0-9)
  $(this).val($(this).val().replace(/[^0-9]/g, ''));
})
$("#fulfillment_cancelrequest").click(function () {
  $("#cancelledChanges_fulfillment").show();
  setTimeout(function () {
    $('#cancelledChanges_fulfillment').hide();
  }, 3000);
})
$('#email').on('keyup', function () {
  // Get the value of the input field
  const emailInput = $(this).val();
  const messageSpan = $('#validation-message');

  // Regular expression for basic email validation
  // This pattern checks for a valid format (e.g., name@domain.com)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailInput.length === 0) {
    // Clear message if the field is empty
    messageSpan.text('');
  }
  else if (emailRegex.test(emailInput)) {
    // Valid email format
    messageSpan.text(' ');
  }
  else {
    // Invalid email format
    messageSpan.text('Enter a valid email address.');
  }
});
function checkStreet() {
  var street = $("#street_fulfillment").val().trim();
  if (street.length > 0) {
    $('#street_mandatory_fulfillment').hide();
    $(".street_content_fulfillment input").removeClass("warningBorder")
    return true;
  } else if (street.length < 40) {
    $('#street_mandatory_fulfillment').show();
    $(".street_content_fulfillment input").addClass("warningBorder");
    return false;
  }
}
function checkCityFulfillment() {
  var city = $("#cityFulfillment").val();
  city != null ? city.trim() : null;
  if (city && city !== '') {
    console.log(city);
    $('#cityFulfillment_mandatory').hide();
    $(".cityFulfillment_content select").removeClass("warningBorder");
    return true;
  }
  else {
    $('#cityFulfillment_mandatory').show();
    $(".cityFulfillment_content select").addClass("warningBorder");
    return false;
  }
}
function checkFulfillment() {
  var fulfillment = $("#fulfillmentField").val();
  fulfillment != null ? fulfillment.trim() : null;
  if (fulfillment && fulfillment !== '') {
    console.log(fulfillment);
    $('#fulfillment_mandatoryText').hide();
    $(".fulfillmentField_content button").removeClass("warningBorder");
    return true;
  }
  else {
    $('#fulfillment_mandatoryText').show();
    $(".fulfillmentField_content button").addClass("warningBorder");
    return false;
  }
}
function checkDelivery() {
  // $('#mandatoryfields_toast').show();
  var delivery = $("#deliveryField").val();
  delivery != null ? delivery.trim() : null;
  if (delivery && delivery !== '') {
    console.log(delivery);
    $('#delivery_mandatoryText').hide();
    $(".deliveryContent select").removeClass("warningBorder");
    return true;
  }
  else {
    $('#delivery_mandatoryText').show();
    $(".deliveryContent select").addClass("warningBorder");
    return false;
  }
}
function checkStateFulfillment() {
  var state = $("#stateFulfillment_field").val();
  state != null ? state.trim() : null;
  if (state && state !== '') {
    console.log(state);
    $('#stateFulfillment_mandatory').hide();
    $(".stateFulfillment_content select").removeClass("warningBorder");
    return true;
  }
  else {
    $('#stateFulfillment_mandatory').show();
    $(".stateFulfillment_content select").addClass("warningBorder");
    return false;
  }
}
const dropdownButton = document.getElementById("dropdownButton");
const selectedContainer = dropdownButton.querySelector(".selected-container");
const items = document.querySelectorAll(".dropdown-item");
let selectedValues = [];
const maxSelections = 3;

function renderSelected() {
  if (selectedValues.length > 0) {
    selectedContainer.innerHTML = selectedValues.map(v => `
    <span class="selected-item">
      ${v} 
      <span class="remove-icon" data-value="${v}">
        <i class="fa fa-times" aria-hidden="true"></i>
      </span>
    </span>
  `).join("");

    $('#dropdownButton').removeClass('warningBorder');
    $('#fulfillment_mandatoryText').hide();

  } else {
    selectedContainer.textContent = "Select";
  }

  document.querySelectorAll(".remove-icon").forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      const value = e.target.getAttribute("data-value");
      selectedValues = selectedValues.filter(v => v !== value);
      renderSelected();
    });
  });
}


items.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const value = item.getAttribute("data-value");

    if (!selectedValues.includes(value)) {
      if (selectedValues.length < maxSelections) {
        selectedValues.push(value);
      }
    } else {
      selectedValues = selectedValues.filter(v => v !== value);
    }

    renderSelected();
  });
});
$(document).ready(function () {
  // Single listener on the parent div using Event Delegation
  $("#fulfillment_content").on("keydown", "select, button, input", function (event) {

    if (event.key === "Tab") {
      var $field = $(this);
      var fieldId = $field.attr('id');
      var val = "";

      // 1. Logic to get the value based on the element type
      if (fieldId === "dropdownButton") {
        // For the custom fulfillment dropdown, check the text in the span
        val = $("#dropdownButton .selected-container").text().trim();
        if (val === "Select") val = ""; // Treat placeholder as empty
      } else {
        // For standard select and input
        val = $field.val() ? $field.val().trim() : "";
        // Treat the default "Select" option in standard dropdown as empty
        if (val === "Select") val = "";
      }

      // 2. Mapping the Field ID to the Error Message ID
      var errorMap = {
        "deliveryField": "#delivery_mandatoryText",
        "dropdownButton": "#fulfillment_mandatoryText",
        "street_fulfillment": "#street_mandatory_fulfillment",
        "cityFulfillment": "#cityFulfillment_mandatory",
        "stateFulfillment_field": "#stateFulfillment_mandatory",
      };

      var errorId = errorMap[fieldId];

      // 3. Validation Logic
      if (errorId) {
        if (val === "" || val === null) {
          $(errorId).show();
          $field.addClass("warningBorder");
        } else {
          $(errorId).hide();
          $field.removeClass("warningBorder");
        }
      }
    }
  });
});


