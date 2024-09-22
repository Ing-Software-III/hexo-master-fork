import img from './img';
import { encodeURL } from 'hexo-util';
import type Hexo from '../../hexo';

/**
 * Asset image tag for Hexo.
 *
 * This tag is used to insert an image asset into a post.
 *
 * @param {Hexo} ctx - The Hexo instance used for rendering the image.
 * @returns {Function} A function that processes the asset image tag.
 */
export = (ctx: Hexo) => {
  const PostAsset = ctx.model('PostAsset');

  return function assetImgTag(args: string[]) {
    const len = args.length;

    for (let i = 0; i < len; i++) {
      const asset = PostAsset.findOne({post: this._id, slug: args[i]});
      if (asset) {
        args[i] = encodeURL(new URL(asset.path, ctx.config.url).pathname);
        return img(ctx)(args);
      }
    }
  };
};
