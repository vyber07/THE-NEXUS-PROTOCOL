export interface MissionObjective {
    id: number;
    role: 'Red Team' | 'Blue Team';
    title: string;
    description: string;
    prompt: string;
    flag: string; // The correct answer
    points: number;
    completed: boolean;
    required: boolean;
    hint?: string;
    maxAttempts?: number;
}

export interface MissionData {
    id: string;
    name: string;
    description: string;
    difficulty: 'Easy' | 'Medium';
    duration: number; // in seconds
    traceThreshold: number; // 0-100
    phases: number;
    objectives: MissionObjective[];
}

export const MISSIONS: MissionData[] = [
    {
        id: "stage-1",
        name: "Stage 1: Initial Reconnaissance",
        description: "The first phase of any cyber operation begins with intelligence gathering. Identify vulnerabilities, map the attack surface, and establish your foothold.",
        difficulty: "Easy",
        duration: 1200, // 20 minutes
        traceThreshold: 25,
        phases: 1,
        objectives: [
            {
                id: 101,
                role: "Red Team",
                title: "Directory Enumeration",
                description: "The target organization has a misconfigured web server exposing sensitive directories. Your objective is to locate the backup directory containing critical information.",
                prompt: "Navigate to `http://target-corp.local/admin/backup/` and locate the file named `credentials.txt`. What is the admin password hash found in the file?",
                flag: "5f4dcc3b5aa765d61d8327deb882cf99",
                points: 50,
                completed: false,
                required: true,
                hint: "Look for common backup directory names like /backup/, /old/, or /dev/",
                maxAttempts: 3
            },
            {
                id: 102,
                role: "Blue Team",
                title: "Vulnerability Assessment",
                description: "Security scanners have detected a critical vulnerability in the organization's content management system. Identify the specific CVE to prioritize patching.",
                prompt: "The system is running 'WordPress Plugin: FileManager v6.9'. Search the National Vulnerability Database (NVD) for this plugin. What is the CVE ID for the Remote Code Execution vulnerability?",
                flag: "CVE-2020-25213",
                points: 50,
                completed: false,
                required: true,
                hint: "Use the NVD database at nvd.nist.gov or cve.mitre.org",
                maxAttempts: 3
            },
            {
                id: 103,
                role: "Red Team",
                title: "Subdomain Discovery",
                description: "Organizations often have forgotten subdomains that may contain vulnerabilities. Use reconnaissance techniques to discover hidden subdomains.",
                prompt: "Perform subdomain enumeration on `target-corp.local`. Which subdomain hosts the development environment? (Format: subdomain.target-corp.local)",
                flag: "dev.target-corp.local",
                points: 40,
                completed: false,
                required: false,
                hint: "Common subdomains include: dev, staging, test, admin, api",
                maxAttempts: 5
            },
            {
                id: 104,
                role: "Blue Team",
                title: "Log Analysis - Suspicious Activity",
                description: "Review system logs to identify potential reconnaissance activities. Attackers often leave traces during the information gathering phase.",
                prompt: "Analyze the web server access logs. An attacker performed directory brute-forcing at 14:23:15 UTC. What was the source IP address?",
                flag: "192.168.45.178",
                points: 40,
                completed: false,
                required: false,
                hint: "Look for patterns of 404 errors or rapid sequential requests",
                maxAttempts: 3
            }
        ]
    },
    {
        id: "stage-2",
        name: "Stage 2: Exploitation & Defense",
        description: "The reconnaissance phase is complete. Now the real battle begins - exploitation versus defense. Red Team attempts to breach systems while Blue Team works to detect and prevent intrusions.",
        difficulty: "Medium",
        duration: 1800, // 30 minutes
        traceThreshold: 50,
        phases: 1,
        objectives: [
            {
                id: 201,
                role: "Red Team",
                title: "SQL Injection Attack",
                description: "The login portal at `/admin/login.php` is vulnerable to SQL injection. Exploit this vulnerability to bypass authentication and gain administrative access.",
                prompt: "Inject a SQL payload into the username field to bypass authentication. Once logged in, the admin dashboard displays a secret API key. Enter the API key.",
                flag: "API_KEY_7f8a9b2c4d5e6f1a",
                points: 80,
                completed: false,
                required: true,
                hint: "Try classic SQL injection payloads like: ' OR '1'='1' --",
                maxAttempts: 5
            },
            {
                id: 202,
                role: "Blue Team",
                title: "Intrusion Detection",
                description: "A web shell has been uploaded to the server. Analyze the compromised system to determine the attacker's actions and establish a timeline.",
                prompt: "Review `/var/log/apache2/access.log`. The attacker uploaded a file named 'shell.php'. What was the exact timestamp of the upload? (Format: DD/MMM/YYYY:HH:MM:SS)",
                flag: "17/Feb/2026:14:22:05",
                points: 80,
                completed: false,
                required: true,
                hint: "Look for POST requests to upload endpoints or suspicious file extensions",
                maxAttempts: 3
            },
            {
                id: 203,
                role: "Red Team",
                title: "Privilege Escalation",
                description: "You've gained initial access with limited privileges. Exploit a misconfigured SUID binary to escalate to root privileges.",
                prompt: "Find the SUID binary in `/usr/local/bin/` that can be exploited. What is the name of the vulnerable binary?",
                flag: "backup_script",
                points: 70,
                completed: false,
                required: false,
                hint: "Use 'find / -perm -4000 2>/dev/null' to locate SUID binaries",
                maxAttempts: 4
            },
            {
                id: 204,
                role: "Blue Team",
                title: "Malware Analysis",
                description: "A suspicious executable has been detected on a workstation. Perform static analysis to identify its behavior and classification.",
                prompt: "Calculate the SHA256 hash of the malware sample located at `/quarantine/suspicious.exe`. What is the hash value?",
                flag: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                points: 70,
                completed: false,
                required: false,
                hint: "Use tools like sha256sum or online hash calculators",
                maxAttempts: 2
            },
            {
                id: 205,
                role: "Red Team",
                title: "Lateral Movement",
                description: "With access to one system, pivot to other machines on the network. Identify credentials or vulnerabilities that allow lateral movement.",
                prompt: "Dump credentials from memory using Mimikatz. What is the NTLM hash of the 'administrator' account?",
                flag: "aad3b435b51404eeaad3b435b51404ee",
                points: 90,
                completed: false,
                required: false,
                hint: "Look for cached credentials or use 'sekurlsa::logonpasswords'",
                maxAttempts: 3
            },
            {
                id: 206,
                role: "Blue Team",
                title: "Incident Response",
                description: "A ransomware attack is in progress. Identify the encryption algorithm used and locate the ransom note to understand the threat actor's demands.",
                prompt: "Analyze the ransom note at `C:\\Users\\Public\\README_DECRYPT.txt`. What cryptocurrency wallet address is provided for payment?",
                flag: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
                points: 90,
                completed: false,
                required: false,
                hint: "Bitcoin addresses typically start with '1', '3', or 'bc1'",
                maxAttempts: 2
            }
        ]
    }
];
