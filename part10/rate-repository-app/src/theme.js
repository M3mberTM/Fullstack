import {Platform} from "react-native";

const theme = {
    colors: {
        headingPrimary: '#fbfff5',
        headingSecondary: '#82967b',
        textPrimary: '#000000',
        textSecondary: '#3d3d3d',
        primary: '#24292e',
        background: '#cccccc',
        foreground: '#ffffff',
        highlight: '#165eff',
        error: '#bd3232'
    },
    fontSizes: {
        body: 14,
        subheading: 16,
        heading: 20,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        })
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;
