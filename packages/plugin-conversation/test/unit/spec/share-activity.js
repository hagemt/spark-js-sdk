/**!
 *
 * Copyright (c) 2015-2016 Cisco Systems, Inc. See LICENSE file.
 */

import {assert} from '@ciscospark/test-helper-chai';
import {ShareActivity} from '../..';

describe(`plugin-conversation`, () => {
  describe(`ShareActivity`, () => {
    describe(`#_determineContentCategory`, () => {
      let sa;
      beforeEach(() => {
        sa = new ShareActivity();
      });

      it(`returns "documents" when not all files have a mimeType`, () => {
        const items = [
          {mimeType: `image/png`},
          {}
        ];
        assert.equal(sa._determineContentCategory(items), `documents`);
      });

      it(`returns "documents" for non-homogenous mimeTypes`, () => {
        const items = [
          {mimeType: `image/png`},
          {mimeType: `video/h264`}
        ];
        assert.equal(sa._determineContentCategory(items), `documents`);
      });

      it(`returns "documents" if the potentially homogenous mimeType is not image or video`, () => {
        const items = [
          {mimeType: `application/xml`},
          {mimeType: `application/xml`}
        ];
        assert.equal(sa._determineContentCategory(items), `documents`);
      });

      it(`returns "image" if all mimeTypes are image`, () => {
        const items = [
          {mimeType: `image/png`},
          {mimeType: `image/jpg`}
        ];
        assert.equal(sa._determineContentCategory(items), `images`);
      });

      it(`returns "video" if all mimeTypes are video`, () => {
        const items = [
          {mimeType: `video/h264`},
          {mimeType: `video/vp8`}
        ];
        assert.equal(sa._determineContentCategory(items), `videos`);
      });
    });
  });
});
