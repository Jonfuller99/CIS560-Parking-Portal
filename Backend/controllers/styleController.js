const path = require('path');

//homepage
exports.getStyle = async (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/Styles/MainStyle.css');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading style');
    }
};
