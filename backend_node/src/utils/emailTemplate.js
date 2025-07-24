const getEmailTemplate = (userType, data) => {
    const templates = {
        citizen: {
            subject: 'Verify Your Account - Citizen Portal',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Welcome to Citizen Portal!</h2>
                    <p>Hello ${data.name || 'Citizen'},</p>
                    <p>Thank you for registering with us. Please verify your email address:</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${data.verificationLink}" 
                           style="background-color: #007bff; color: white; padding: 12px 24px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Verify Email Address
                        </a>
                    </div>
                    
                </div>
            `
        },
        
        adminInvite: {
            subject: 'Admin Account Invitation - Setup Required',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2> You've been invited as an Administrator!</h2>
                    <p>Hello ${data.name || 'Admin'},</p>
                    <p><strong>You have been invited to join us as an Administrator.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3>Your Account Details</h3>
                        <p><strong>Admin ID:</strong> ${data.adminId}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Role:</strong> Administrator</p>
                    </div>
                    
                    <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
                        <p><strong> Next Steps:</strong></p>
                        <ol>
                            <li>Click the invitation link below</li>
                            <li>Set your secure password</li>
                            <li>Complete your profile setup</li>
                            <li>Start managing the system</li>
                        </ol>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${data.inviteLink}" 
                           style="background-color: #28a745; color: white; padding: 15px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px;">
                             Accept Invitation & Setup Account
                        </a>
                    </div>
                    
                    <p style="color: #666;">Or copy and paste this link:</p>
                    <p style="word-break: break-all; color: #007bff;">${data.inviteLink}</p>
                    
                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin-top: 20px;">
                        <p><strong>Important:</strong></p>
                        <p>This invitation will expire in <strong>7 days</strong>. Please accept it soon!</p>
                    </div>
                    
                    <hr style="margin: 30px 0;">
                    <p style="color: #666; font-size: 12px;">
                        If you didn't expect this invitation, please contact ${data.inviterName} or ignore this email.
                    </p>
                </div>
            `
        },
        
        officialInvite: {
            subject: 'Official Account Invitation - Setup Required',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2> You've been invited as an Official!</h2>
                    <p>Hello ${data.name || 'Official'},</p>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3>Your Account Details</h3>
                        <p><strong>Official ID:</strong> ${data.officialId}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Role:</strong> Official</p>
                    </div>
                            
                    <hr style="margin: 30px 0;">
                    <p style="color: #666; font-size: 12px;">
                        If you didn't expect this invitation, please contact ${data.inviterName} or ignore this email.
                    </p>
                </div>
            `
        },
    };
    
    return templates[userType] || templates.citizen;
};

export { getEmailTemplate };