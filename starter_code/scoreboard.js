const ScoreBoard = {
	ctx: undefined,

	init: function(ctx) {
		this.ctx = ctx
		this.ctx.font = '50px sans-serif'
	},

	update: function(score) {
		this.ctx.fillStyle = 'white'
		this.ctx.fillText(score, 50, 70)
		this.ctx.strokeText(score, 50, 70)
	}
}
