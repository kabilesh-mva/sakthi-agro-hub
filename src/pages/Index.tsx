import Home from "./Home";
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Sakthi Agro - Agricultural Equipment Sales, Service & Genuine Spare Parts in Coimbatore</title>
        <meta name="description" content="Sakthi Agro - Your trusted partner for agricultural equipment, machinery sales, expert service, and genuine spare parts in Coimbatore. Serving farmers since 2012." />
        <meta name="keywords" content="agricultural equipment, farming tools, tractor parts, pumps, sprayers, engines, spare parts, Coimbatore, Tamil Nadu, farming, agriculture, irrigation, diesel engines, farming solutions" />
        <meta name="author" content="Sakthi Agro" />
        <meta property="og:title" content="Sakthi Agro - Agricultural Equipment Sales, Service & Genuine Spare Parts in Coimbatore" />
        <meta property="og:description" content="Your trusted partner for agricultural equipment, machinery sales, expert service, and genuine spare parts in Coimbatore. Serving farmers since 2012." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sakthiagro.com" />
        <link rel="canonical" href="https://www.sakthiagro.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sakthi Agro",
            "image": "https://www.sakthiagro.com/logo.png",
            "@id": "https://www.sakthiagro.com",
            "url": "https://www.sakthiagro.com",
            "telephone": "+919443600205",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Coimbatore",
              "addressLocality": "Coimbatore",
              "addressRegion": "Tamil Nadu",
              "postalCode": "641001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 11.0168499218435,
              "longitude": 76.9283123148274
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "10:00",
                "closes": "16:00"
              }
            ],
            "priceRange": "$$",
            "areaServed": {
              "@type": "City",
              "name": "Coimbatore"
            },
            "serviceType": "Agricultural Equipment Sales and Service",
            "description": "Trusted agricultural equipment supplier since 2012. Specializing in sprayers, pumps, engines, and spare parts with expert service and warranty support in Coimbatore, Tamil Nadu.",
            "brand": "Sakthi Agro",
            "foundingDate": "2012",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+919443600205",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["English", "Tamil"]
            }
          })}
        </script>
      </Helmet>
      <Home />
    </>
  );
};

export default Index;
