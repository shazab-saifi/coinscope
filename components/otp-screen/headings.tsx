import ScreenHeading from "../screen-heading";

export default function Headings({ email }: { email: string }) {
  const [namePart, domainPart] = email.split("@");
  let truncatedName;
  if (namePart.length <= 4) {
    truncatedName = namePart;
  } else {
    const stars = "*".repeat(namePart.length - 4);
    truncatedName = `${namePart.slice(0, 2)}${stars}${namePart.slice(-2)}`;
  }
  const truncateEmail = `${truncatedName}@${domainPart}`;

  return (
    <ScreenHeading
      heading="We've sent you an OTP"
      subheading={`Enter the OTP we've sent on ${truncateEmail}`}
    />
  );
}
