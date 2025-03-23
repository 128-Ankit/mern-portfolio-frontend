

const ContactInfo = ({ icon: Icon, title, content }) => (
    <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
        <div className="p-3 rounded-full bg-purple-900/30">
            <Icon className="text-xl text-purple-400" />
        </div>
        <div>
            <h3 className="text-gray-400 text-sm">{title}</h3>
            <p className="text-white font-medium">{content}</p>
        </div>
    </div>
);

export default ContactInfo;