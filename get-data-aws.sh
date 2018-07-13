synapseusername=`aws secretsmanager --region us-east-1 --output text get-secret-value --secret-id synapse-agora-username | cut -f 4`
synapsepassword=`aws secretsmanager --region us-east-1 --output text get-secret-value --secret-id synapse-agora-password | cut -f 4`

mkdir -f ../data/

synapse -u ${synapseusername} -p ${synapsepassword} cat syn13363290 | tail -n +2 | while IFS=, read -r id version; do
  synapse -u ${synapseusername} -p ${synapsepassword} get --downloadLocation ../data/ -v $version $id ;
done

mkdir -f ../data/team_images/
synapse -u ${synapseusername} -p ${synapsepassword} get -r --downloadLocation ../data/team_images/ syn12861877
