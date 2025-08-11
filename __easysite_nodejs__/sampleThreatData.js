function sampleThreatData() {
  const threatTypes = [
  'SSH Brute Force Attack',
  'SQL Injection Attempt',
  'DDoS Attack',
  'Port Scanning',
  'Malware Download',
  'Credential Stuffing',
  'Web Application Attack',
  'Network Intrusion'];


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
  'Warsaw, Poland'];


  // Generate sample threat data
  const threats = [];
  const currentTime = new Date();

  for (let i = 0; i < 25; i++) {
    const detectionTime = new Date(currentTime.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Random time within last 7 days

    const threat = {
      honeypot_id: `HP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      threat_type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      severity_level: severityLevels[Math.floor(Math.random() * severityLevels.length)],
      source_ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      attack_vector: attackVectors[Math.floor(Math.random() * attackVectors.length)],
      detection_time: detectionTime.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      details: `Automated attack detected from suspicious IP address. Pattern analysis indicates coordinated threat activity.`
    };

    threats.push(threat);
  }

  return threats;
}