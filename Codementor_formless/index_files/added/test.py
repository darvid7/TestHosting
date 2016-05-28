import cgi
form = cgi.FieldStorage()
email =  form.getvalue('email')

print("hello")
print(email)
