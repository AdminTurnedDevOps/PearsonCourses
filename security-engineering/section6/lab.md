15 minutes

## Test Burp Suite Against A Web App

1. Download: https://portswigger.net/burp/communitydownload

2. Keep all of the defaults when first opening Burp

3. Click the orange **New live task** button.

4. Choose the following:
Tools - Proxy
URL scope - Everything

Click save

4. Click the **Target** button

5. Click Open Browser. You should see a browser open.

6. Go back to the **Dashboard** tab

7. Go to Google.com

8 .You should see host traffic on the dashboard

## Use `nmap` to scan ports

1. Download `nmap`: https://nmap.org/download.html

2. Find out your IP address range on your system.

3. Run the following command to run a ping scan:
```
nmap -sp your_ip_range/your_cidr
```

4. Scan the 5 most popular ports on your system
```
your_ip_range
```

5. Scan all subnets in your network leaving the last octet blank. 
For example:
```
nmap 192.164.1.*
```