export const specialCharString = "\u00A0"; // non-break-space
export const nof_length_value = 5;

export const between_charactor =
  specialCharString.repeat(nof_length_value) +
  "-" +
  specialCharString.repeat(nof_length_value);
