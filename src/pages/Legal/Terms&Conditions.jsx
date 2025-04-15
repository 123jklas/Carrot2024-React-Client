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

const TermsAndConditions = () => {
  return (
    <div>
        <Navbar/>
        <Container component="main" maxWidth="md" className="legal-page">
        <CssBaseline />
        <Box sx={{ marginTop: 8, marginBottom: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
            Terms and Conditions
            </Typography>

            <Typography variant="body1" paragraph>
            Welcome to our platform (the "Website"). By accessing or using our
            Website, you agree to be bound by these Terms and Conditions. Please
            read them carefully. If you do not agree with any part of these Terms
            and Conditions, you must not use the Website.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
            1. Our Service
            </Typography>
            <Typography variant="body1" paragraph>
            We operate as a platform similar to a classified listings site. Our Website allows sellers to post product listings
            containing images, descriptions, pricing information, seller contact
            details (e.g., name, username, phone number, email), and the location
            of the product. Interested buyers can contact the seller through the
            provided contact information. We do not facilitate, handle, or
            guarantee any transactions.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
            2. User Responsibilities
            </Typography>
            <Typography variant="body1" paragraph>
            1) <strong>Sellers</strong> are solely responsible for the content of
            their listings, including the accuracy of the information provided,
            the authenticity of the product, and any intellectual property rights
            involved. Any content you upload must comply with applicable laws and
            must not infringe on third-party rights.
            </Typography>
            <Typography variant="body1" paragraph>
            2) <strong>Buyers</strong> are responsible for verifying the
            information provided by sellers before proceeding with any
            transaction. You acknowledge and agree that any interaction or
            transaction you engage in with another user on the Website is at your
            own risk.
            </Typography>
            <Typography variant="body1" paragraph>
            3) Users may report suspicious or fraudulent listings by clicking the
            "Report" button associated with each product. We encourage our
            community to help us maintain a safe environment.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
            3. Disclaimer of Liability
            </Typography>
            <Typography variant="body1" paragraph>
            We merely display information about products and facilitate contact
            between buyers and sellers. We are <strong>not</strong> responsible
            for and do not control any aspect of the transaction, including the
            validity or legitimacy of a listing, the condition of the product,
            shipment details, or any payment arrangements. We disclaim all
            liability for any loss, harm, or damage resulting from or arising out
            of transactions initiated through the Website.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
            4. Prohibited Activities
            </Typography>
            <Typography variant="body1" paragraph>
            You agree not to upload content that is illegal, fraudulent, or
            violates the rights of any individual or entity. Additionally, you
            agree not to engage in any activities that could harm the Website or
            other users, such as spreading malware or engaging in abusive or
            harassing behavior.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
            5. Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
            The Website and its original content, features, and functionality are
            owned by us or our licensors. You may not duplicate, copy, or reuse
            any portion of the code or visuals without express written permission.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
            6. Modifications to the Terms
            </Typography>
            <Typography variant="body1" paragraph>
            We reserve the right to modify or replace these Terms and Conditions
            at any time. We will endeavor to provide notice of significant
            changes, but it is your responsibility to periodically review these
            Terms. Your continued use of the Website after any modifications
            indicates your acceptance of the new Terms and Conditions.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
            7. Governing Law
            </Typography>
            <Typography variant="body1" paragraph>
            These Terms and Conditions are governed by and construed in accordance
            with the laws of the jurisdiction where we are headquartered, without
            regard to its conflict of law provisions.
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
            8. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
            If you have any questions about these Terms and Conditions, please
            contact us at <strong>utcodong@gmail.com</strong>.
            </Typography>
        </Box>
        </Container>
        <Footer/>
    </div>
  )
}

export default TermsAndConditions
