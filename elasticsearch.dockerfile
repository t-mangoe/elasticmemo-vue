FROM elasticsearch:7.10.1
COPY elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml
# RUN elasticsearch-plugin install analysis-kuromoji