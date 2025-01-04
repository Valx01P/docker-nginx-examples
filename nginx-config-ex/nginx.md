# Introduction to NGINX

NGINX is a high-performance web server, reverse proxy, and load balancer. Initially created to handle the **C10k problem** (10,000 concurrent connections), it uses an **event-driven asynchronous architecture**, making it extremely efficient and capable of handling a large number of concurrent connections with low resource usage.

## Common Use Cases

- **Static Web Server**: Serving static assets (HTML, CSS, JS, images).
- **Reverse Proxy**: Forwarding incoming requests to backend services or microservices.
- **Load Balancer**: Distributing incoming traffic across multiple backend servers.
- **SSL/TLS Termination**: Handling HTTPS connections (decrypting traffic at the edge).
- **Content Caching**: Caching responses from backend services.

---

## Installation

### Installing on Linux (e.g., Ubuntu/Debian)

```bash
sudo apt update
sudo apt install nginx
Installing from Source
Download the latest NGINX source from nginx.org/download.
Install build dependencies and libraries (libpcre3, zlib, openssl).
Compile and install:
bash
Copy code
./configure --prefix=/etc/nginx \
            --sbin-path=/usr/sbin/nginx \
            --conf-path=/etc/nginx/nginx.conf \
            --with-http_ssl_module \
            --with-http_v2_module
make
sudo make install
NGINX Configuration Basics
NGINX’s primary configuration file is typically located at /etc/nginx/nginx.conf. It can include other configuration files (commonly in /etc/nginx/conf.d/ or /etc/nginx/sites-enabled/).

Configuration File Structure
Below is a typical nginx.conf file structure:

nginx
Copy code
user  nginx;             # The user or group running NGINX worker processes
worker_processes  auto;  # Automatically scale worker processes based on CPU cores

error_log  /var/log/nginx/error.log warn;  # Error log file location
pid        /var/run/nginx.pid;            # PID file location

events {
    worker_connections  1024;  # Maximum connections per worker process
}

http {
    include       /etc/nginx/mime.types;  # Recognizes standard MIME types
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    keepalive_timeout  65;

    # Gzip settings (optional)
    gzip on;
    gzip_comp_level 5;
    gzip_types text/plain text/css application/json application/javascript;

    # Server block for virtual host
    server {
        listen       80;
        server_name  example.com www.example.com;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
    }
}
Key Sections:
events block: Configures global settings for the event model.
http block: Contains HTTP-related settings, including server blocks, logging, Gzip, and caching.
server block: Defines virtual hosts (multiple server blocks per NGINX instance).
location block: Defines request processing for specific URI patterns.
Important Directives & Configuration Blocks
http Context
include: Includes other configuration snippets.
sendfile on;: Enables efficient file transmission.
keepalive_timeout 65;: Sets HTTP connection keep-alive duration.
gzip: Controls Gzip compression for responses.
log_format / access_log: Customizes request logging format and location.
server Context
listen: Specifies the port and IP/interface for the server block.
server_name: Specifies domain names handled by this block.
ssl_certificate / ssl_certificate_key: Enables HTTPS.
location Context
proxy_pass: Forwards requests to a backend server.
try_files: Attempts to serve files in a specific order or returns an error.
SSL/TLS Configuration
To enable HTTPS in NGINX, include the following in your server block:

nginx
Copy code
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        root   /usr/share/nginx/html;
        index  index.html;
    }
}
For Let's Encrypt certificates, the typical locations are:

/etc/letsencrypt/live/example.com/fullchain.pem
/etc/letsencrypt/live/example.com/privkey.pem
Reverse Proxy Configuration
A simple reverse proxy setup:

nginx
Copy code
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass         http://127.0.0.1:5000/;
        proxy_http_version 1.1;
        proxy_set_header   Host               $host;
        proxy_set_header   X-Real-IP          $remote_addr;
        proxy_set_header   X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto  $scheme;
    }
}
Load Balancing with Upstreams
NGINX supports various load balancing algorithms (e.g., least_conn, ip_hash).

nginx
Copy code
http {
    upstream backend_pool {
        least_conn;
        server backend1.example.com max_fails=3 fail_timeout=30s;
        server backend2.example.com max_fails=3 fail_timeout=30s;
    }

    server {
        listen 80;
        server_name example.com;

        location / {
            proxy_pass http://backend_pool;
        }
    }
}
Advanced Configurations
URL Rewriting
nginx
Copy code
location /old-page {
    rewrite ^/old-page$ /new-page permanent;
}
Custom Error Pages
nginx
Copy code
server {
    error_page 404 /custom_404.html;
    location = /custom_404.html {
        root /usr/share/nginx/html/errors;
    }
}
Rate Limiting
nginx
Copy code
http {
    limit_req_zone $binary_remote_addr zone=one:10m rate=5r/s;

    server {
        location / {
            limit_req zone=one burst=10 nodelay;
            proxy_pass http://127.0.0.1:5000;
        }
    }
}
Conclusion
NGINX is a versatile, high-performance server capable of handling a wide range of tasks. Mastering its configuration ensures efficient deployments, whether for static content, reverse proxies, or load balancing. Always test configurations (nginx -t) and reload gracefully (systemctl reload nginx) to avoid downtime.

css
Copy code

This Markdown file is structured to provide clarity, logical flow, and ease of reading when rendered. You can paste it directly into a Markdown editor or viewer to display it beautifully.
