
function setupFooterContent() {
  // Default footer content structure
  const footerContent = [
    // Social Media Links
    {
      section_name: 'social_media',
      link_title: 'LinkedIn',
      link_url: 'https://linkedin.com/company/honeypotz',
      link_icon: 'Linkedin',
      is_external: true,
      display_order: 1,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    {
      section_name: 'social_media',
      link_title: 'Twitter',
      link_url: 'https://twitter.com/honeypotz',
      link_icon: 'Twitter',
      is_external: true,
      display_order: 2,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    {
      section_name: 'social_media',
      link_title: 'GitHub',
      link_url: 'https://github.com/honeypotz',
      link_icon: 'Github',
      is_external: true,
      display_order: 3,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    {
      section_name: 'social_media',
      link_title: 'YouTube',
      link_url: 'https://youtube.com/@honeypotz',
      link_icon: 'Youtube',
      is_external: true,
      display_order: 4,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    
    // Contact Methods
    {
      section_name: 'contact',
      link_title: 'Email Support',
      link_url: 'mailto:support@honeypotz.com',
      link_icon: 'Mail',
      is_external: true,
      display_order: 1,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    {
      section_name: 'contact',
      link_title: 'Phone Support',
      link_url: 'tel:+1-800-HONEYPOT',
      link_icon: 'Phone',
      is_external: true,
      display_order: 2,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    {
      section_name: 'contact',
      link_title: 'Live Chat',
      link_url: '#chat',
      link_icon: 'MessageCircle',
      is_external: false,
      display_order: 3,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    
    // Quick Links
    {
      section_name: 'quick_links',
      link_title: 'Documentation',
      link_url: '/docs',
      link_icon: 'BookOpen',
      is_external: false,
      display_order: 5,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    {
      section_name: 'quick_links',
      link_title: 'API Reference',
      link_url: '/api-docs',
      link_icon: 'Code',
      is_external: false,
      display_order: 6,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    {
      section_name: 'quick_links',
      link_title: 'Security Blog',
      link_url: '/blog',
      link_icon: 'Newspaper',
      is_external: false,
      display_order: 7,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    
    // Legal Links
    {
      section_name: 'legal',
      link_title: 'Privacy Policy',
      link_url: '/privacy',
      link_icon: 'Shield',
      is_external: false,
      display_order: 1,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    {
      section_name: 'legal',
      link_title: 'Terms of Service',
      link_url: '/terms',
      link_icon: 'FileText',
      is_external: false,
      display_order: 2,
      is_active: true,
      click_count: 0,
      created_by: 1
    },
    {
      section_name: 'legal',
      link_title: 'Cookie Policy',
      link_url: '/cookies',
      link_icon: 'Cookie',
      is_external: false,
      display_order: 3,
      is_active: true,
      click_count: 0,
      created_by: 1
    }
  ];

  return {
    success: true,
    message: 'Footer content structure ready',
    data: footerContent
  };
}
