async function insertSampleData() {
    // Insert sample testimonials
    const testimonials = [
        {
            company_name: "CyberTech Solutions",
            customer_name: "Sarah Johnson",
            position: "Chief Information Security Officer",
            testimonial_text: "HoneyPot Farm has revolutionized our threat detection capabilities. We've identified and mitigated over 200 potential breaches in just the first month. The real-time alerts and comprehensive analytics have made our security operations significantly more effective.",
            rating: 5,
            company_logo: "",
            is_featured: true,
            case_study_title: "Preventing Advanced Persistent Threats",
            case_study_summary: "How CyberTech Solutions deployed 500+ honeypots across their infrastructure to detect and prevent APT attacks, resulting in a 90% reduction in successful breach attempts."
        },
        {
            company_name: "SecureBank International", 
            customer_name: "Michael Chen",
            position: "Head of Cybersecurity",
            testimonial_text: "The scalable infrastructure and multi-cloud deployment capabilities have streamlined our security operations across 15 data centers. The threat intelligence feeds provide invaluable insights into emerging attack patterns.",
            rating: 5,
            company_logo: "",
            is_featured: true,
            case_study_title: "Banking Security at Scale",
            case_study_summary: "Implementing enterprise-grade deception technology across multiple geographic regions, achieving 24/7 threat monitoring and reducing incident response time by 75%."
        },
        {
            company_name: "DataGuard Corporation",
            customer_name: "Emily Rodriguez",
            position: "Senior Security Analyst",
            testimonial_text: "The intuitive dashboard and automated reporting features have transformed how we analyze and respond to security incidents. Our team can now focus on strategic security initiatives rather than manual threat hunting.",
            rating: 4,
            company_logo: "",
            is_featured: false,
            case_study_title: "Operational Efficiency Boost",
            case_study_summary: "Streamlining security operations and reducing manual workload by 60% through intelligent automation and comprehensive threat visualization."
        },
        {
            company_name: "TechStart Innovations",
            customer_name: "David Kumar",
            position: "IT Security Manager", 
            testimonial_text: "As a growing startup, we needed enterprise-level security without the complexity. HoneyPot Farm delivered exactly that - sophisticated threat detection that's easy to deploy and manage.",
            rating: 5,
            company_logo: "",
            is_featured: false,
            case_study_title: "Startup Security Success",
            case_study_summary: "Achieving enterprise-grade security posture for a fast-growing technology company without dedicated security team overhead."
        }
    ];

    // Insert sample threat data
    const threatTypes = [
        'SSH Brute Force Attack',
        'SQL Injection Attempt', 
        'DDoS Attack',
        'Port Scanning',
        'Malware Download',
        'Credential Stuffing',
        'Web Application Attack',
        'Network Intrusion'
    ];
    
    const attackVectors = ['SSH', 'HTTP', 'HTTPS', 'TCP', 'UDP', 'FTP', 'SMTP'];
    const severityLevels = ['Critical', 'High', 'Medium', 'Low'];
    const statuses = ['Active', 'Investigating', 'Mitigated'];
    const locations = [
        'Beijing, China',
        'Moscow, Russia', 
        'Seoul, South Korea',
        'Mumbai, India',
        'São Paulo, Brazil',
        'Lagos, Nigeria',
        'Bangkok, Thailand',
        'Warsaw, Poland'
    ];

    const threats = [];
    const currentTime = new Date();
    
    for (let i = 0; i < 15; i++) {
        const detectionTime = new Date(currentTime.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        
        threats.push({
            honeypot_id: `HP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            threat_type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
            severity_level: severityLevels[Math.floor(Math.random() * severityLevels.length)],
            source_ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            location: locations[Math.floor(Math.random() * locations.length)],
            attack_vector: attackVectors[Math.floor(Math.random() * attackVectors.length)],
            detection_time: detectionTime.toISOString(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            details: `Automated attack detected from suspicious IP address. Pattern analysis indicates ${Math.random() > 0.5 ? 'coordinated threat activity' : 'isolated attack attempt'}.`
        });
    }

    return {
        testimonials: testimonials.length,
        threats: threats.length,
        message: "Sample data generated successfully"
    };
}