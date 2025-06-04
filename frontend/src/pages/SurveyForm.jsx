import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  email: "",
  whatsappNumber: "",
  collegeName: "",
  yearOfStudy: "",
  city: "",
  lookedForServices: "",
  services: [],
  whereFind: [],
  wouldUseApp: "",
  whatPost: "",
  payToUnlock: "",
  earlyAccess: "",
  campusCircle: "",
};

const serviceOptions = [
  "PG/Room Rentals",
  "Freelance Gigs (Design, Coding, etc.)",
  "Notes/Assignments",
  "Part-Time Jobs",
  "Event Help / Management",
  "Tutoring / Mentoring",
  "Other"
];

const whereOptions = [
  "WhatsApp Groups/Status",
  "Instagram Pages",
  "Friends or Seniors",
  "JustDial / OLX",
  "I never find them easily",
  "Others"
];

export default function SurveyForm() {
  const [form, setForm] = useState(initialState);
  const [otherService, setOtherService] = useState("");
  const [otherWhere, setOtherWhere] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOtherService = (e) => {
    setOtherService(e.target.value);
    setForm((prev) => ({
      ...prev,
      services: [
        ...prev.services.filter((v) => !v.startsWith("Other:")),
        e.target.value ? `Other: ${e.target.value}` : ""
      ].filter(Boolean),
    }));
  };

  const handleOtherWhere = (e) => {
    setOtherWhere(e.target.value);
    setForm((prev) => ({
      ...prev,
      whereFind: [
        ...prev.whereFind.filter((v) => !v.startsWith("Others:")),
        e.target.value ? `Others: ${e.target.value}` : ""
      ].filter(Boolean),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.whatsappNumber || !form.collegeName || !form.yearOfStudy) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5001/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        navigate("/thankyou");
      } else {
        toast.error("Submission failed. Try again.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6 text-primary-dark">Tichi Survey</h2>

          <div className="section">
            <div className="section-title">Section 1: Basics</div>
            <div className="form-group">
              <label>Your Name (Optional)</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Your Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>WhatsApp Number *</label>
              <input name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>College Name *</label>
              <input name="collegeName" value={form.collegeName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Year of Study *</label>
              <select name="yearOfStudy" value={form.yearOfStudy} onChange={handleChange} required>
                <option value="">Select</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>PG</option>
              </select>
            </div>
            <div className="form-group">
              <label>Your City</label>
              <input name="city" value={form.city} onChange={handleChange} />
            </div>
          </div>

          <div className="section">
            <div className="section-title">Section 2: What You Need</div>
            <div className="form-group">
              <label>Have you ever looked for services like room rentals, assignments, or part-time jobs online?</label>
              <select name="lookedForServices" value={form.lookedForServices} onChange={handleChange}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Which of these do you usually look for or offer?</label>
              <div className="checkbox-group">
                {serviceOptions.map((opt) =>
                  opt === "Other" ? (
                    <input
                      key={opt}
                      className="mt-2"
                      placeholder="Other (please specify)"
                      value={otherService}
                      onChange={handleOtherService}
                    />
                  ) : (
                    <div className="checkbox-item" key={opt}>
                      <input
                        type="checkbox"
                        id={`service-${opt}`}
                        name="services"
                        value={opt}
                        checked={form.services.includes(opt)}
                        onChange={handleChange}
                      />
                      <label htmlFor={`service-${opt}`}>{opt}</label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Where do you usually find these things now?</label>
              <div className="checkbox-group">
                {whereOptions.map((opt) =>
                  opt === "Others" ? (
                    <input
                      key={opt}
                      className="mt-2"
                      placeholder="Others (please specify)"
                      value={otherWhere}
                      onChange={handleOtherWhere}
                    />
                  ) : (
                    <div className="checkbox-item" key={opt}>
                      <input
                        type="checkbox"
                        id={`where-${opt}`}
                        name="whereFind"
                        value={opt}
                        checked={form.whereFind.includes(opt)}
                        onChange={handleChange}
                      />
                      <label htmlFor={`where-${opt}`}>{opt}</label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Section 3: The Tichi Idea</div>
            <div className="form-group">
              <label>Would you use this app to find stuff or offer your own services?</label>
              <select name="wouldUseApp" value={form.wouldUseApp} onChange={handleChange}>
                <option value="">Select</option>
                <option>Yes! Sounds super useful</option>
                <option>Maybe, depending on how it works</option>
                <option>Nah, not really my thing</option>
              </select>
            </div>
            <div className="form-group">
              <label>If you could post something useful or earn from it, what would you post?</label>
              <input 
                name="whatPost" 
                value={form.whatPost} 
                onChange={handleChange} 
                placeholder="Eg: I take notes, I can find rooms, I edit videos, I know tutors, etc."
              />
            </div>
            <div className="form-group">
              <label>How much would you be okay paying to unlock a useful contact?</label>
              <select name="payToUnlock" value={form.payToUnlock} onChange={handleChange}>
                <option value="">Select</option>
                <option>₹5</option>
                <option>₹10</option>
                <option>₹20</option>
                <option>Depends on how useful it is</option>
              </select>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Section 4: Be Part of Tichi's Journey</div>
            <div className="form-group">
              <label>Would you like early access to Tichi before the official launch?</label>
              <select name="earlyAccess" value={form.earlyAccess} onChange={handleChange}>
                <option value="">Select</option>
                <option>Yes! Add me please</option>
                <option>No thanks</option>
              </select>
            </div>
            <div className="form-group">
              <label>Want to be part of our "Tichi Campus Circle"?</label>
              <select name="campusCircle" value={form.campusCircle} onChange={handleChange}>
                <option value="">Select</option>
                <option>Yes, sounds fun!</option>
                <option>Maybe</option>
                <option>Not right now</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className="mt-4">Submit</button>
        </form>
      </div>
    </div>
  );
}