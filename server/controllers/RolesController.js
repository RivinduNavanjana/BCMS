const Role = require("../models/RolesModel");
const Employee = require("../models/EmployeeModel");
const nodemailer = require("nodemailer");

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sltmobitelbcmssystem@gmail.com',
    pass: 'lvbr ypwc atoa qcfi',
  },
});

// Store new role data
const createRole = async(req, res) => {
  const { roles, responsibilities } = req.body;
  try{
  const role = await Role.findById(req.params.id);
  if (!role) {
    return res.status(404).json({ error: "Meeting not found." });
  }
  
    role.roles=roles;
    role.responsibilities=responsibilities;
  
    await role.save();
     // Fetch emails of roles
     const rolesDetails = await Employee.find({
      _id: { $in: roles }
    }).select('email name');
    
    // Send individual emails to each attendee
    for (const attendee of rolesDetails) {
      const mailOptions = {
        from: 'sltmobitelbcmssystem@gmail.com',
        to: attendee.email,
        subject: 'Roles Updated',
        text: `Dear ${roles.name},\n\nThe details of your roles and responsibilities. New details:\n
               Role: ${roles}\n
               Resposibility:${responsibilities}\n
               Note: This is an auto-generated email. Please do not reply to this email.`
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent to:', roles.email, info.response);
      }catch(error) {
        console.error('Error sending email to:', roles.email, error);
      }
    }
    res.json("Roles Created!");
  }catch(err) {
    console.error('Error Create roles or sending emails:', err);
     res.status(400).json({ Error: err });
  }
};


// Get all roles
const getRoles = (req, res) => {
  Role.find()
    .then((roles) => res.json(roles))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Update all roles
const updateRoles = (req, res) => {
  const rolesToUpdate = req.body;

  const updatePromises = rolesToUpdate.map(role => {
    return Role.findByIdAndUpdate(role._id, {
      $set: {
        roles: role.roles,
        responsibilities: role.responsibilities
      }
    });
  });

  Promise.all(updatePromises)
    .then(() => res.json("Roles updated successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  createRole,
  getRoles,
  updateRoles
};
