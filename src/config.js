// Site-wide settings. Edit this file to change contact details.
export const siteConfig = {
  brand: 'VOYARA',
  // International format, digits only (no +, spaces or dashes). 20 = Egypt.
  whatsappNumber: '201000000000',
  phone: '+20 100 000 0000',
  email: 'hello@voyara.example',
  socials: {
    instagram: 'https://instagram.com/voyara',
    facebook: 'https://facebook.com/voyara',
    youtube: 'https://youtube.com/@voyara',
  },
};

export const whatsappLink = (message = '') =>
  `https://wa.me/${siteConfig.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
