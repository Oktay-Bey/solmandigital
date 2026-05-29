import type React from "react"

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1px solid #e0e0e0",
  borderRadius: 7,
  fontSize: "0.9rem",
  color: "#111111",
  backgroundColor: "#ffffff",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
}

export const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.775rem",
  fontWeight: 700,
  color: "#444444",
  marginBottom: "0.5rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
}

export const submitButtonStyle = (sending: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  backgroundColor: sending ? "#c0392b" : "#9b1c1c",
  color: "#ffffff",
  padding: "0.875rem 1.5rem",
  borderRadius: 7,
  fontWeight: 700,
  fontSize: "0.875rem",
  border: "none",
  cursor: sending ? "not-allowed" : "pointer",
  letterSpacing: "0.02em",
})

export const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "#9b1c1c"
}

export const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "#e0e0e0"
}
