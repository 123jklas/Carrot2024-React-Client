import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import {
  Container,
  CssBaseline,
  Typography,
  Box
} from '@mui/material'
import '../../assets/styles/Terms.css'

const PrivacyPolicy = () => {
  return (
    <div>
        <Navbar/>
        <Container component="main" maxWidth="md" className="legal-page">
            <CssBaseline />
            <Box sx={{ marginTop: 8, marginBottom: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Privacy Policy
            </Typography>

            <Typography variant="body1" paragraph>
                We value your privacy. This Privacy Policy describes how we collect,
                use, store, and disclose information that users ("you") provide when
                you access or use our platform (the "Website"). By using the Website,
                you agree to the collection and use of information in accordance with
                this policy.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                1. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>a. Personal Information:</strong> When you sign up or create a
                listing, we may collect personal information such as your name, email
                address, username, and other contact details required to display with
                your listings.
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>b. Usage Data:</strong> We may collect information on how the
                Website is accessed and used (e.g., pages visited, time spent on each
                page, browser type).
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>c. Cookies:</strong> We may use cookies and similar tracking
                technologies to track activity on our Website and store certain
                information. You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                2. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>a. To Provide Our Service:</strong> We use your personal
                information to create your account and allow you to post and manage
                product listings.
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>b. For Communication:</strong> We use your contact information
                to respond to your inquiries, send updates, and provide support.
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>c. To Improve the Website:</strong> We analyze usage data to
                improve our platform’s performance, features, and user experience.
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>d. Fraud Prevention:</strong> We may use the information
                collected to prevent fraudulent or illegal activities on the Website.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                3. Information Sharing and Disclosure
            </Typography>
            <Typography variant="body1" paragraph>
                We do not sell or rent your personal information to third parties.
                However, we may share certain information in the following
                circumstances:
            </Typography>
            <Typography variant="body1" paragraph>
                • With service providers who assist us in operating the Website.  
                • If required by law or to respond to valid requests by public
                authorities (e.g., court or government agencies).  
                • To protect our rights, privacy, safety, or property, and/or that of
                our affiliates, you, or others.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                4. Data Retention
            </Typography>
            <Typography variant="body1" paragraph>
                We will retain your personal information only for as long as is
                necessary for the purposes set out in this Privacy Policy, unless a
                longer retention period is required or permitted by law.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                5. Security
            </Typography>
            <Typography variant="body1" paragraph>
                We take reasonable steps to protect the information you share with us
                from loss, misuse, and unauthorized access. However, no method of
                transmission over the Internet or electronic storage is 100% secure
                and we cannot guarantee absolute security.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                6. Third-Party Links
            </Typography>
            <Typography variant="body1" paragraph>
                Our Website may contain links to other websites or services that are
                not operated by us. We have no control over and assume no
                responsibility for the content, privacy policies, or practices of any
                third-party sites or services.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                7. Children’s Privacy
            </Typography>
            <Typography variant="body1" paragraph>
                Our Website is not intended for individuals under the age of 13. We do
                not knowingly collect personally identifiable information from anyone
                under 13. If you are a parent or guardian and believe that your child
                has provided us with personal data, please contact us.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                8. Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
                We may update our Privacy Policy from time to time. We will notify you
                of any changes by posting the new Privacy Policy on this page. Your
                continued use of the Website after any changes indicates your
                acceptance of the revised policy.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                9. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
                If you have any questions about this Privacy Policy, please contact us
                at <strong>utcodong@gmail.com</strong>.
            </Typography>
            </Box>
        </Container>
        <Footer/>
    </div>
  )
}

export default PrivacyPolicy
