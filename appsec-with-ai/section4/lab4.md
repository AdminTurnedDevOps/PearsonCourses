10 minutes

## Create A Snort Server On Ubuntu

1. Update
```
sudo apt-get update
```

2. Install Snort
```
sudo apt-get install snort -y
```

3. To determine which interface Snort should listen on, type the interface on the Snort configuration area after typing the following command.
```
ip a
```

4. During installation, you will see a pop-up asking for your IP address range. Enter 192.168.0.0/24 and proceed
```
snort --version
```

5. Navigate to the Snort configuration directory:
```
cd /etc/snort
```

6. Create a backup of the Snort config file.
```
sudo cp snort.conf snort.conf.backup
```

7. Look at the Snort command line basics to get a good understanding of how to use Snort:
https://docs.snort.org/start/help