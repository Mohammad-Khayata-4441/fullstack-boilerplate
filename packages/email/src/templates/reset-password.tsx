import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  name: string;
  url: string;
  expiresInHours?: number;
}

export function ResetPasswordEmail({ name, url, expiresInHours = 1 }: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={text}>
            Hi {name}, we received a request to reset your password. This link expires in{" "}
            {expiresInHours} hour{expiresInHours !== 1 ? "s" : ""}.
          </Text>
          <Section style={btnContainer}>
            <Button href={url} style={button}>
              Reset password
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            If you didn't request a password reset, you can safely ignore this email. Your password
            will not be changed.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

ResetPasswordEmail.PreviewProps = {
  name: "Jane",
  url: "http://localhost:3001/reset-password?token=abc123",
  expiresInHours: 1,
} satisfies ResetPasswordEmailProps;

const main = { backgroundColor: "#f6f9fc", fontFamily: "sans-serif" };
const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "32px",
  borderRadius: "8px",
  maxWidth: "560px",
};
const h1 = { color: "#1a1a1a", fontSize: "24px", fontWeight: "600", margin: "0 0 16px" };
const text = { color: "#444", fontSize: "16px", lineHeight: "24px", margin: "0 0 16px" };
const btnContainer = { margin: "24px 0" };
const button = {
  backgroundColor: "#000",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
};
const hr = { borderColor: "#e6ebf1", margin: "24px 0" };
const footer = { color: "#8898aa", fontSize: "12px" };
