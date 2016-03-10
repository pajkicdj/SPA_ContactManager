# Homepage (Root path)
require 'json'



get '/' do
  erb :index
end

# before do
#   content_type 'application/json'
# end

get '/contacts' do
  @contacts = Contact.all
  @contacts.to_json
end

post '/contacts/new' do
  @contact = Contact.new
  @contact.first_name = params[:first_name]
  @contact.last_name = params[:last_name]
  @contact.email = params[:email]
  @contact.to_json if @contact.save
end

get '/contacts/search' do
  @term = params[:search_t]
  @contacts = Contact.all
  @query = @contacts.where('first_name LIKE ? OR last_name LIKE ? OR email LIKE ?', "%#{@term}%", "%#{@term}%", "%#{@term}%")
  @query.to_json
end


# contacts_all = []
#       conn.exec_params('
#         SELECT * FROM contacts WHERE name LIKE $1 OR email LIKE $1', ["%#{term}%"]).each do |cons|
#         new_con = Contact.new(cons['name'], cons['email'])
#         new_con.id = cons['id']
#         contacts_all.push(new_con)
#       end
#       ContactList.list(contacts_all)


put '/contacts/:id' do
  @contact = Contact.find(params[:id])
  @contact.first_name = params[:first_name]
  @contact.last_name = params[:last_name]
  @contact.email = params[:email]
  @contact.to_json if @contact.save
  #   {:contact => @contact, :status => "success"}.to_json
  # else
  #   {:contact => @contact, :status => "failure"}.to_json
  # end
end

get '/contacts/:id' do
  @contact = Contact.find(params[:id]).to_json
end


delete '/contacts/:id' do
  @contact = Contact.find(params[:id])
  @contact.destroy

end





