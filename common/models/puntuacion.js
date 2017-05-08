'use strict';

module.exports = function(Puntuacion) {
	Puntuacion.observe('before save', function(ctx, next) {
		if (ctx.isNewInstance) {
			if (ctx.instance) {
				if (ctx.options && ctx.options.accessToken && ctx.options.accessToken.userId) {
					ctx.instance.usuarioId = ctx.options.accessToken.userId;
				}
			}
		}
		next();
	});

};
