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

interface WelcomeEmailProps {
  name: string;
  url: string;
}

export function WelcomeEmail({ name, url }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome aboard!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome, {name}!</Heading>
          <Text style={text}>
            We're thrilled to have you. Click below to get started.
          </Text>
          <Section style={btnContainer}>
            <Button href={url} style={button}>
              Get started
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            If you didn't create an account, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

WelcomeEmail.PreviewProps = {
  name: "Jane",
  url: "http://localhost:3001",
} satisfies WelcomeEmailProps;

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
