const businessEmail = "fantastictrailer26@gmail.com";

const yearElement = document.querySelector("#year");
const enquiryForm = document.querySelector("#enquiry-form");
const modelSelect = document.querySelector("#model-select");
const formNote = document.querySelector("#form-note");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

document.querySelectorAll(".enquire-button").forEach((button) => {
  button.addEventListener("click", () => {
    const model = button.dataset.model;

    if (modelSelect && model) {
      modelSelect.value = model;
    }

    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      enquiryForm?.querySelector('input[name="name"]')?.focus();
    }, 450);
  });
});

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(enquiryForm);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const model = String(data.get("model") || "").trim();
    const message = String(data.get("message") || "").trim();

    const enquiryType = enquiryForm.dataset.enquiryType || "Trailer";
    const subject = `${enquiryType} enquiry: ${model || "Tow Tow Trailer"}`;
    const body = [
      "Hi Tow Tow Trailer,",
      "",
      enquiryType === "Parts"
        ? "I would like to enquire about a trailer part or accessory."
        : "I would like to enquire about a box trailer.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not supplied"}`,
      `${enquiryType === "Parts" ? "Part or accessory" : "Trailer model or accessory"}: ${model}`,
      "",
      "Message:",
      message || "Please contact me about availability and pricing.",
      "",
      "Thanks",
    ].join("\n");

    const mailto = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    if (formNote) {
      formNote.textContent = "Your email app should open with the enquiry ready to send.";
    }
  });
}
