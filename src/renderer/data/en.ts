export default new Map<string, string>([
  ['tf.c', 'Constant'],
  ['tf.random', 'Random'],
  ['tf.sin', 'Wave'],
  ['tf.bpm', 'Audio BPM'],
  ['tf.scene', 'With Scene'],

  ['wf.s', 'By Source'],
  ['wf.i', 'By Image'],

  ['sof.ordered', 'Ordered'],
  ['sof.random', 'Randomized'],

  ['of.strict', 'Strictly Ordered'],
  ['of.ordered', 'Ordered'],
  ['of.random', 'Randomized'],

  ['if.any', 'All files'],
  ['if.videos', 'Only videos'],
  ['if.gifs', 'Only animated'],
  ['if.images', 'Only image files'],
  ['if.stills', 'Only stills'],

  ['ot.original', 'No Change'],
  ['ot.onlylandscape', 'Only Landscape'],
  ['ot.onlyportrait', 'Only Portrait'],
  ['ot.forcelandscape', 'Force Landscape'],
  ['ot.forceportrait', 'Force Portrait'],

  ['go.none', 'No Change'],
  ['go.part', 'Play Part (Constant)'],
  ['go.partr', 'Play Part (Random)'],
  ['go.atleast', 'Play At Least'],
  ['go.full', 'Play Full'],

  ['vo.none', 'No Change'],
  ['vo.part', 'Play Part (Constant)'],
  ['vo.partr', 'Play Part (Random)'],
  ['vo.atleast', 'Play At Least'],
  ['vo.full', 'Play Full'],

  ['bt.blur', 'Blurred'],
  ['bt.color', 'Solid Color'],
  ['bt.colorset', 'Set of Colors'],
  ['bt.colorrand', 'Random Colors'],
  ['bt.none', 'None'],

  ['sc.color', 'Solid Color'],
  ['sc.colorset', 'Set of Colors'],
  ['sc.colorrand', 'Random Colors'],

  ['it.fitBestNoClip', 'Fit Best (No Clipping)'],
  ['it.fitBestClip', 'Fit Best (Clip Edges)'],
  ['it.stretch', 'Stretch'],
  ['it.center', 'Center'],
  ['it.centerNoClip', 'Center (No Clipping)'],
  ['it.fitWidth', 'Fit Width'],
  ['it.fitHeight', 'Fit Height'],

  ['htf.none', 'None'],
  ['htf.left', 'Left'],
  ['htf.right', 'Right'],
  ['htf.random', 'Left/Right'],

  ['vtf.none', 'None'],
  ['vtf.up', 'Up'],
  ['vtf.down', 'Down'],
  ['vtf.random', 'Up/Down'],

  ['stf.left', 'Left'],
  ['stf.right', 'Right'],
  ['stf.leftright', 'Left/Right'],
  ['stf.up', 'Up'],
  ['stf.down', 'Down'],
  ['stf.updown', 'Up/Down'],
  ['stf.random', 'Random'],

  ['gt.tumblr', 'Tumblr'],
  ['gt.local', 'Local'],

  ['tt.weight', 'Percent'],
  ['tt.all', 'Require'],
  ['tt.none', 'Exclude'],
  ['tt.or', 'Any'],

  ['sf.alpha', 'By Title'],
  ['sf.alphaFull', 'By Full Title'],
  ['sf.date', 'By Date'],
  ['sf.count', 'By Count'],
  ['sf.type', 'By Type'],
  ['sf.duration', 'By Duration'],
  ['sf.resolution', 'By Resolution'],
  ['sf.random', 'Randomize Order'],

  ['asf.url', 'By URL'],
  ['asf.name', 'By Name'],
  ['asf.artist', 'By Artist'],
  ['asf.album', 'By Album'],
  ['asf.date', 'By Date'],
  ['asf.duration', 'By Duration'],
  ['asf.playedcount', 'By Play Count'],
  ['asf.random', 'Randomize Order'],

  ['st.tumblr', 'Tumblr'],
  ['st.reddit', 'Reddit'],
  ['st.redgifs', 'RedGifs'],
  ['st.imagefap', 'ImageFap'],
  ['st.sexcom', 'SexCom'],
  ['st.imgur', 'Imgur'],
  ['st.twitter', 'Twitter'],
  ['st.deviantart', 'DeviantArt'],
  ['st.instagram', 'Instagram'],
  ['st.danbooru', 'Danbooru'],
  ['st.e621', 'E621'],
  ['st.luscious', 'Luscious'],
  ['st.gelbooru1', 'Gelbooru'],
  ['st.gelbooru2', 'Gelbooru'],
  ['st.ehentai', 'EHentai'],
  ['st.bdsmlr', 'BDSMlr'],
  ['st.hydrus', 'Hydrus'],
  ['st.piwigo', 'Piwigo'],
  ['st.nimja', 'Nimja'],
  ['st.video', 'Video'],
  ['st.playlist', 'Playlist'],
  ['st.list', 'List'],
  ['st.local', 'Local'],
  ['st.audio', 'Audio'],

  ['sl.top', 'Above All'],
  ['sl.middle', 'Above Scene'],
  ['sl.image', 'Strobe Image'],
  ['sl.background', 'Behind Image'],
  ['sl.bottom', 'Behind All'],

  ['af.url', '+ URL'],
  ['af.audios', '+ Local audio'],
  ['af.directory', '+ Local directory'],
  ['af.videos', '+ Local video/playlist'],
  ['af.videodir', '+ Local directory of videos'],
  ['af.library', '+ From Library'],

  ['rf.hot', 'Hot'],
  ['rf.new', 'New'],
  ['rf.top', 'Top'],
  ['rf.cont', 'Controversial'],
  ['rf.rising', 'Rising'],

  ['date_available', "Date Available"],
  ['date_creation', "Date Created"],
  ['name', "Name"],
  ['file', "Filename"],
  ['hit', "Hits"],
  ['rating_score', "Rating"],
  ['id', "ID"],

  ['wc.bottomRight', 'Bottom Right'],
  ['wc.bottomLeft', 'Bottom Left'],
  ['wc.topRight', 'Top Right'],
  ['wc.topLeft', 'Top Left'],

  ['hour', 'Last Hour'],
  ['day', 'Last Day'],
  ['week', 'Lasy Week'],
  ['month', 'Last Month'],
  ['year', 'Last Year'],
  ['all', 'All Time'],

  ['ea.linear', 'Linear'],
  ['ea.sinIn', 'Sin In'],
  ['ea.sinOut', 'Sin Out'],
  ['ea.sinInOut', 'Sin InOut'],
  ['ea.expIn', 'Exp In'],
  ['ea.expOut', 'Exp Out'],
  ['ea.expInOut', 'Exp InOut'],
  ['ea.circleIn', 'Circle In'],
  ['ea.circleOut', 'Circle Out'],
  ['ea.circleInOut', 'Circle InOut'],
  ['ea.bounceIn', 'Bounce In'],
  ['ea.bounceOut', 'Bounce Out'],
  ['ea.bounceInOut', 'Bounce InOut'],
  ['ea.polyIn', 'Poly In'],
  ['ea.polyOut', 'Poly Out'],
  ['ea.polyInOut', 'Poly InOut'],
  ['ea.elasticIn', 'Elastic In'],
  ['ea.elasticOut', 'Elastic Out'],
  ['ea.elasticInOut', 'Elastic InOut'],
  ['ea.backIn', 'Back In'],
  ['ea.backOut', 'Back Out'],
  ['ea.backInOut', 'Back InOut'],
]);