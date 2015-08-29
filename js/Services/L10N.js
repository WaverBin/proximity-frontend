var supportedLang = {
	'en': 'English',
	'fr': 'Français'
};

var lang = window.navigator.language.split('-')[0];
lang = supportedLang[lang] != null ? lang : 'en';
moment.locale(lang);

var L10N = {
	logout: {
		'en': 'Logout',
		'fr': 'Déconnexion'
	},
	users: {
		'en': 'Users',
		'fr': 'Usagers'
	},
	username: {
		'en': 'User name',
		'fr': 'Nom d\'usager'
	},
	conversations: {
		'en': 'Conversations',
		'fr': 'Conversations'
	},
	noAvailableUsers: {
		'en': 'No users available at the moment',
		'fr': 'Aucun usager en ligne présentement'
	},
	account: {
		'en': 'Account',
		'fr': 'Compte'
	},
	settings: {
		'en': 'Settings',
		'fr': 'Réglages'
	},
	enterName: {
		'en': 'Enter your user name',
		'fr': 'Entrer un nom d\'utilisateur'
	},
	sendMessage: {
		'en': 'Send a message...',
		'fr': 'Envoyer un message...'
	},
	logoutConfirmation: {
		'en': 'Are you sure you want to log out?',
		'fr': 'Êtes-vous certain de vouloir vous déconnecter?'
	},
	accountEraseConfirmation: {
		'en': 'This will erase all your conversations and your account',
		'fr': 'Cette action effacera vos conversations et votre compte'
	},
	ok: {
		'en': 'OK',
		'fr': 'D\'accord'
	},
	cancel: {
		'en': 'Cancel',
		'fr': 'Annuler'
	},
	peopleInTrend: {
		'en': 'people in this trend',
		'fr': 'personnes dans cette tendance'
	},
	trends: {
		'en': 'Trends',
		'fr': 'Tendances'
	},
	connect: {
		'en': 'Connect',
		'fr': 'Connexion'
	}
};