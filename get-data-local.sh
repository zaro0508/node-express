mkdir -f ../data/

synapse cat syn13363290 | tail -n +2 | while IFS=, read -r id version; do
  synapse get --downloadLocation ../data/ -v $version $id ;
done

mkdir -f ../data/team_images/
synapse get -r --downloadLocation ../data/team_images/ syn12861877
