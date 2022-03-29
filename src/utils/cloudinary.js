const cloudinary = {
	w100(img) {
		if (!img) return;
		if (img.startsWith('http')) return img;
		return `https://res.cloudinary.com/itgo/image/upload/c_scale,w_100/v1/${img}`;
	},

	w150(img) {
		if (!img) return;
		if (img.startsWith('http')) return img;
		return `https://res.cloudinary.com/itgo/image/upload/c_scale,w_150/v1/${img}`;
	},

	w300(img) {
		if (!img) return;
		if (img.startsWith('http')) return img;
		return `https://res.cloudinary.com/itgo/image/upload/c_scale,w_300/v1/${img}`;
	},

	w500(img) {
		if (!img) return;
		if (img.startsWith('http')) return img;
		return `https://res.cloudinary.com/itgo/image/upload/c_scale,w_500/v1/${img}`;
	},

	w700(img) {
		if (!img) return;
		if (img.startsWith('http')) return img;
		return `https://res.cloudinary.com/itgo/image/upload/c_scale,w_700/v1/${img}`;
	},

	w900(img) {
		if (!img) return;
		if (img.startsWith('http')) return img;
		return `https://res.cloudinary.com/itgo/image/upload/c_scale,w_900/v1/${img}`;
	},

	pdf(file) {
		if (!file) return;
		if (file.startsWith('http')) return file;
		return `https://res.cloudinary.com/itgo/image/upload/v1648576775/${file}`;
	},
};

export default cloudinary;
