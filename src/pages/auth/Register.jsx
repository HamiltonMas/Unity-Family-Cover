import React, { useState } from "react";
import websiteLogo from "../../assets/logo.png";
import styles from "../../styles/Register.module.css"; // Import CSS Module

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Company Info
  const [companyName, setCompanyName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyCertificate, setCompanyCertificate] = useState(null);

  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);

  // Admin Info
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");

  // Submission / verification state
  const [submitted, setSubmitted] = useState(false);

  // Progress bar component
  const ProgressBar = () => (
    <div className={styles.progressBar}>
      {[
        { number: 1, label: "Company" },
        { number: 2, label: "Contact" },
        { number: 3, label: "Admin" },
        { number: 4, label: "Review" }
      ].map((stepItem) => (
        <div key={stepItem.number} className={styles.progressStepContainer}>
          <div
            className={`${styles.progressStep} ${
              step === stepItem.number ? styles.progressStepActive : step > stepItem.number ? styles.progressStepCompleted : ''
            }`}
          >
            {step > stepItem.number ? '✓' : stepItem.number}
          </div>
          <span className={styles.progressLabel}>{stepItem.label}</span>
        </div>
      ))}
    </div>
  );

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!companyName.trim()) newErrors.companyName = "Company name is required";
      if (!registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
      if (!companyIndustry.trim()) newErrors.companyIndustry = "Industry is required";
      if (!companyCertificate) newErrors.companyCertificate = "Certificate is required";
    }

    if (currentStep === 2) {
      if (!companyEmail.trim()) newErrors.companyEmail = "Company email is required";
      else if (!/\S+@\S+\.\S+/.test(companyEmail)) newErrors.companyEmail = "Email is invalid";
      if (!companyPhone.trim()) newErrors.companyPhone = "Company phone is required";
    }

    if (currentStep === 3) {
      if (!adminName.trim()) newErrors.adminName = "Admin name is required";
      if (!adminEmail.trim()) newErrors.adminEmail = "Admin email is required";
      else if (!/\S+@\S+\.\S+/.test(adminEmail)) newErrors.adminEmail = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleFileChange = (e, setter, fieldName, maxSizeMB = 5) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setErrors({ ...errors, [fieldName]: `File must be less than ${maxSizeMB}MB` });
        return;
      }
      setter(file);
      setErrors({ ...errors, [fieldName]: "" });
    }
  };

  const handleSubmit = async () => {
    if (validateStep(4)) {
      setLoading(true);

      try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const registrationData = {
          company: {
            name: companyName,
            registrationNumber,
            industry: companyIndustry,
            certificate: companyCertificate,
            email: companyEmail,
            phone: companyPhone,
            address: companyAddress,
            website: companyWebsite,
            logo: companyLogo,
          },
          admins: [
            {
              name: adminName,
              email: adminEmail,
              phone: adminPhone,
              role: "Company Admin",
            },
          ],
        };

        console.log("Registration Data:", registrationData);
        setSubmitted(true);
      } catch (error) {
        console.error("Registration failed:", error);
        setErrors({ submit: "Registration failed. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className={styles.registerConfirmation}>
        <div className={styles.confirmationContent}>
          <img src={websiteLogo} alt="Website Logo" className={styles.websiteLogo} />
          <div className={styles.successIcon}>✓</div>
          <h1>Registration Submitted Successfully!</h1>
          <div className={styles.confirmationDetails}>
            <p>
              Thank you for registering <strong>{companyName}</strong>.
            </p>
            <p>
              Your company account is <strong>pending verification</strong>. Once
              verified, the Company Admin will receive an email to set the password
              and log in.
            </p>
            <p>Please check your email ({adminEmail}) for updates.</p>
          </div>
          <div className={styles.confirmationActions}>
            <button 
              className={`${styles.btn} ${styles.primaryBtn}`}
              onClick={() => window.location.reload()}
            >
              Register Another Company
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={websiteLogo} alt="Website Logo" className={styles.websiteLogo} />
      </div>

      <div className={styles.registerBox}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Register Your Company</h1>
          <p className={styles.subtitle}>Complete the steps to create your company account</p>
        </div>

        <ProgressBar />

        {/* Step 1: Company Details & Certificate */}
        {step === 1 && (
          <div className={styles.formStep}>
            <div className={styles.stepHeader}>
              <h2>Company Details</h2>
              <p>Enter your company's official information</p>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Company Name *</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={errors.companyName ? styles.inputError : ''}
                />
                {errors.companyName && <span className={styles.errorMessage}>{errors.companyName}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Registration Number *</label>
                <input
                  type="text"
                  placeholder="Tax ID or registration number"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className={errors.registrationNumber ? styles.inputError : ''}
                />
                {errors.registrationNumber && <span className={styles.errorMessage}>{errors.registrationNumber}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Industry *</label>
                <input
                  type="text"
                  placeholder="e.g. Technology, Healthcare"
                  value={companyIndustry}
                  onChange={(e) => setCompanyIndustry(e.target.value)}
                  className={errors.companyIndustry ? styles.inputError : ''}
                />
                {errors.companyIndustry && <span className={styles.errorMessage}>{errors.companyIndustry}</span>}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <div className={styles.fileUploadSection}>
                  <label>Upload Company Certificate *</label>
                  <div className={styles.fileUpload}>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileChange(e, setCompanyCertificate, 'companyCertificate', 5)}
                      accept=".pdf,.jpg,.png"
                    />
                    <div className={styles.uploadPlaceholder}>
                      <span>📄 Click to upload certificate</span>
                      <small>PDF, JPG, PNG up to 5MB</small>
                    </div>
                  </div>
                  {errors.companyCertificate && <span className={styles.errorMessage}>{errors.companyCertificate}</span>}
                  {companyCertificate && (
                    <div className={styles.filePreview}>
                      <span>✅ {companyCertificate.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.buttonGroupSingle}>
              <button onClick={handleNext} className={`${styles.btn} ${styles.primaryBtn}`}>
                Continue to Contact Details
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Info & Logo */}
        {step === 2 && (
          <div className={styles.formStep}>
            <div className={styles.stepHeader}>
              <h2>Company Contact Details</h2>
              <p>Enter your company's contact information</p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Company Email *</label>
                <input
                  type="email"
                  placeholder="company@email.com"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className={errors.companyEmail ? styles.inputError : ''}
                />
                {errors.companyEmail && <span className={styles.errorMessage}>{errors.companyEmail}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Company Phone *</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  className={errors.companyPhone ? styles.inputError : ''}
                />
                {errors.companyPhone && <span className={styles.errorMessage}>{errors.companyPhone}</span>}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Company Address</label>
                <input
                  type="text"
                  placeholder="Enter full address"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Website</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <div className={styles.fileUploadSection}>
                  <label>Company Logo</label>
                  <div className={styles.fileUpload}>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileChange(e, setCompanyLogo, 'companyLogo')}
                      accept="image/*"
                    />
                    <div className={styles.uploadPlaceholder}>
                      <span>📁 Click to upload logo</span>
                      <small>PNG, JPG up to 5MB</small>
                    </div>
                  </div>
                  {companyLogo && (
                    <div className={styles.logoPreviewSmall}>
                      <img
                        src={URL.createObjectURL(companyLogo)}
                        alt="Company Logo"
                        className={styles.companyLogoPreview}
                      />
                      <span>{companyLogo.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button onClick={handleBack} className={`${styles.btn} ${styles.secondaryBtn}`}>
                Back
              </button>
              <button onClick={handleNext} className={`${styles.btn} ${styles.primaryBtn}`}>
                Continue to Admin Details
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Admin Info */}
        {step === 3 && (
          <div className={styles.formStep}>
            <div className={styles.stepHeader}>
              <h2>Administrator Information</h2>
              <p>Set up the first admin account for your company</p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Admin Name *</label>
                <input
                  type="text"
                  placeholder="Enter admin name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className={errors.adminName ? styles.inputError : ''}
                />
                {errors.adminName && <span className={styles.errorMessage}>{errors.adminName}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Admin Email *</label>
                <input
                  type="email"
                  placeholder="admin@email.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className={errors.adminEmail ? styles.inputError : ''}
                />
                {errors.adminEmail && <span className={styles.errorMessage}>{errors.adminEmail}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Admin Phone</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.noteCompact}>
              <strong>Note:</strong> Password will be set via email after company verification.
            </div>

            <div className={styles.buttonGroup}>
              <button onClick={handleBack} className={`${styles.btn} ${styles.secondaryBtn}`}>
                Back
              </button>
              <button onClick={handleNext} className={`${styles.btn} ${styles.primaryBtn}`}>
                Review & Submit
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div className={styles.formStep}>
            <div className={styles.stepHeader}>
              <h2>Review & Submit</h2>
              <p>Please verify all information before submitting</p>
            </div>

            <div className={styles.reviewSection}>
              <div className={styles.reviewCategory}>
                <h3>Company Details</h3>
                <div className={styles.reviewGrid}>
                  <div className={styles.reviewItem}>
                    <label>Company Name</label>
                    <span>{companyName}</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <label>Registration Number</label>
                    <span>{registrationNumber}</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <label>Industry</label>
                    <span>{companyIndustry}</span>
                  </div>
                  <div className={`${styles.reviewItem} ${styles.fullWidth}`}>
                    <label>Certificate</label>
                    <span>{companyCertificate ? companyCertificate.name : "Not uploaded"}</span>
                  </div>
                </div>
              </div>

              <div className={styles.reviewCategory}>
                <h3>Contact Details</h3>
                <div className={styles.reviewGrid}>
                  <div className={styles.reviewItem}>
                    <label>Company Email</label>
                    <span>{companyEmail}</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <label>Company Phone</label>
                    <span>{companyPhone}</span>
                  </div>
                  <div className={`${styles.reviewItem} ${styles.fullWidth}`}>
                    <label>Address</label>
                    <span>{companyAddress || "Not provided"}</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <label>Website</label>
                    <span>{companyWebsite || "Not provided"}</span>
                  </div>
                  <div className={`${styles.reviewItem} ${styles.fullWidth}`}>
                    <label>Company Logo</label>
                    <span>{companyLogo ? companyLogo.name : "Not uploaded"}</span>
                  </div>
                </div>
              </div>

              <div className={styles.reviewCategory}>
                <h3>Administrator Details</h3>
                <div className={styles.reviewGrid}>
                  <div className={styles.reviewItem}>
                    <label>Admin Name</label>
                    <span>{adminName}</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <label>Admin Email</label>
                    <span>{adminEmail}</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <label>Admin Phone</label>
                    <span>{adminPhone || "Not provided"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.note} ${styles.noteWarning}`}>
              <strong>Important:</strong> Account will be verified by our platform team before activation. 
            </div>

            {errors.submit && (
              <div className={styles.submitError}>
                {errors.submit}
              </div>
            )}

            <div className={styles.buttonGroup}>
              <button onClick={handleBack} className={`${styles.btn} ${styles.secondaryBtn}`}>
                Back
              </button>
              <button 
                onClick={handleSubmit} 
                className={`${styles.btn} ${styles.primaryBtn} ${loading ? styles.btnLoading : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner}></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;