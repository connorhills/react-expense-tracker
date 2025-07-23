import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    return password && password.length >= 8;
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerSection, fractionalSection] = num.toString().split(".");
    const formattedInteger = integerSection.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalSection
        ? `${formattedInteger}.${fractionalSection}`
        : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const chartData = sortedData.map((item) => ({
        date: moment(item?.date).format('MMM Do'),
        amount: item?.amount,
        description: item?.description,
    }));

    return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('MMM Do'),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('MMM Do'),
        amount: item?.amount,
        description: item?.description,
    }));

    return chartData;
};