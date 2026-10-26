import Image from "next/image";
import Link from "next/link";

/** Real transformation from the Work page (Meridian): a flat architectural portfolio turned into a spatial experience. */
export function TransformCase() {
  return (
    <article className="tf-case">
      <div className="tf-case-media">
        <Image
          src="/portfolio_meridian_3d.jpg"
          alt="Meridian: flat floor plans lifted into a navigable 3D architectural model"
          fill
          sizes="(max-width: 960px) 100vw, 55vw"
          className="tf-case-img"
        />
        <span className="tf-case-tag">After · Spatial 3D</span>
      </div>

      <div className="tf-case-body">
        <span className="tf-case-meta">Architecture &amp; Real Estate · 3D Transformation</span>
        <h3>Meridian</h3>
        <p className="tf-case-line">Walkable scale models from flat floor plans.</p>

        <div className="tf-case-ba">
          <div className="before">
            <b>Before</b>
            <p>Flat CAD PDFs and photography could not show the volume, daylight and proportion of luxury developments.</p>
          </div>
          <div className="after">
            <b>After</b>
            <p>The blueprints became a lightweight, navigable 3D pavilion with layered elevation slices and real-time sunlight.</p>
          </div>
        </div>

        <dl className="tf-case-stats">
          <div>
            <dd>+290%</dd>
            <dt>Dwell time</dt>
          </div>
          <div>
            <dd>60 FPS</dd>
            <dt>Locked</dt>
          </div>
          <div>
            <dd>1.4 MB</dd>
            <dt>Payload</dt>
          </div>
        </dl>

        <div className="tf-case-links">
          <Link href="/work" className="btn btn-ghost btn-sm">
            See all work
          </Link>
          <Link href="/contact" className="btn btn-primary btn-sm">
            Transform my site →
          </Link>
        </div>
      </div>
    </article>
  );
}
