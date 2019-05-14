FROM raspbian/stretch
WORKDIR /root

ARG SSH_PRIVATE_KEY
ARG SSH_PUBLIC_KEY
ARG AWS_KEY
ARG AWS_ACCESS

ENV AWS_ACCESS_KEY_ID=$AWS_KEY
ENV AWS_SECRET_ACCESS_KEY=$AWS_ACCESS

# Hacky bash workaround so we can source later
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Apt-get
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update -y && apt-get install -y --no-install-recommends rssh python python3 python3-pip build-essential apt-transport-https ca-certificates curl git wget && rm -rf /var/lib/apt/lists/*
RUN pip3 install awscli --upgrade --user
# NVM
RUN mkdir /usr/local/nvm
ENV NODE_VERSION 8.16.0
ENV NVM_DIR /usr/local/nvm
ENV NVM_INSTALL_PATH $NVM_DIR/versions/node/v$NODE_VERSION
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash && source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && nvm use default

ENV NODE_PATH $NVM_INSTALL_PATH/lib/node_modules
ENV PATH $NVM_DIR/v$NODE_VERSION/bin:$PATH

# SSH
RUN mkdir -p /root/.ssh && chmod 0700 /root/.ssh && ssh-keyscan github.com > /root/.ssh/known_hosts

RUN echo "$SSH_PRIVATE_KEY" > /root/.ssh/id_rsa && echo "$SSH_PUBLIC_KEY" > /root/.ssh/id_rsa.pub && chmod 600 /root/.ssh/id_rsa && chmod 600 /root/.ssh/id_rsa.pub

# Repo
RUN cd /root && git clone git@github.com:darrenmsmith/FT-WEB.git

ENTRYPOINT ["sh", "-c", "echo Hello"]
