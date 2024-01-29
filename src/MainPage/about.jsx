import { HashLink } from "react-router-hash-link";
import CitationBox from "./components/CitationBox";

import "./about.css";

// string keys stay in insertion order, so use this order to determine the citation number
const references = {
  mpds: {
    type: "db",
    ref: (
      <span>
        The Pauling File{" "}
        <a href="http://paulingfile.com/" target="_blank">
          http://paulingfile.com/
        </a>{" "}
        exposed through the Materials Platform for Data Science{" "}
        <a href="https://mpds.io/" target="_blank">
          https://mpds.io/
        </a>
        .
      </span>
    ),
  },
  cod: {
    type: "db",
    ref: (
      <span>
        S. Gražulis et al. Crystallography open database (COD): an open-access
        collection of crystal structures and platform for world-wide
        collaboration. Nucleic Acids Research, 40:D420-D427, 2012,{" "}
        <a href="http://www.crystallography.net" target="_blank">
          http://www.crystallography.net
        </a>
        .
      </span>
    ),
  },
  icsd: {
    type: "db",
    ref: (
      <span>
        Inorganic Crystal Structure Database,{" "}
        <a href="http://www.fiz-karlsruhe.com/icsd.html" target="_blank">
          http://www.fiz-karlsruhe.com/icsd.html
        </a>
        .
      </span>
    ),
  },
  aiida1: {
    type: "software",
    ref: (
      <span>
        S. P. Huber et al. AiiDA 1.0, a scalable computational infrastructure
        for automated reproducible workflows and data provenance. Sci Data 7,
        300, 2020.{" "}
        <a href="http://www.aiida.net" target="_blank">
          http://www.aiida.net
        </a>
        .
      </span>
    ),
  },
  aiida2: {
    type: "software",
    ref: (
      <span>
        G. Pizzi et al. AiiDA: Automated Interactive Infrastructure and Database
        for Computational Science. Computational Materials Science, 111:218-230,
        2016.
      </span>
    ),
  },
  pymatgen: {
    type: "software",
    ref: (
      <span>
        S. P. Ong et al. Python materials genomics (pymatgen): A robust,
        open-source python library for materials analysis. Computational
        Materials Science, 68:314-319, 2013.
      </span>
    ),
  },
  spglib: {
    type: "software",
    ref: (
      <span>
        A. Togo. Spglib.{" "}
        <a href="https://spglib.readthedocs.io/" target="_blank">
          https://spglib.readthedocs.io/
        </a>
        .
      </span>
    ),
  },
  qe: {
    type: "software",
    ref: (
      <span>
        P. Giannozzi et al. Advanced capabilities for materials modelling with
        Quantum ESPRESSO. Journal of Physics: Condensed Matter, 29:465901, 2017.
      </span>
    ),
  },
  phonon_vis: {
    type: "software",
    ref: (
      <span>
        H. Miranda, Phonon Visualizer,{" "}
        <a
          href="https://github.com/henriquemiranda/phononwebsite/"
          target="_blank"
        >
          https://github.com/henriquemiranda/phononwebsite/
        </a>
        .
      </span>
    ),
  },
  cod_parser: {
    type: "software",
    ref: (
      <span>
        A. Merkys et al. COD::CIF::Parser: an error-correcting CIF parser for
        the Perl language Journal of Applied Crystallography 49 (2016)
      </span>
    ),
  },
  vdw_lee: {
    type: "pseudo_functionals",
    ref: (
      <span>
        K. Lee et al., High-accuracy van der Waals density functional, Physical
        Review B, 82:081101, 2010.
      </span>
    ),
  },
  vdw_cooper: {
    type: "pseudo_functionals",
    ref: (
      <span>
        V. R. Cooper, van der Waals density functional: An appropriate
        exchange-functional. Physical Review B, 81:161104, 2010.
      </span>
    ),
  },
  vdw_vydrov: {
    type: "pseudo_functionals",
    ref: (
      <span>
        O. A. Vydrov and T. Van Voorhis, Nonlocal van der Waals density
        functional: the simpler the better. Journal of Chemical Physics,
        133:244103, 2010.
      </span>
    ),
  },
  vdw_sabatini: {
    type: "pseudo_functionals",
    ref: (
      <span>
        R. Sabatini et al., Nonlocal van der Waals density functional made
        simple and efficient. Physical Review B, 87:041108 (R). 2013.
      </span>
    ),
  },
  pbe: {
    type: "pseudo_functionals",
    ref: (
      <span>
        J. P. Perdew, K. Burke, and M. Ernzerhof, Generalized Gradient
        Approximation Made Simple, Phys. Rev. Lett. 77, pp. 3865, 1996.
      </span>
    ),
  },
  sssp: {
    type: "pseudo_functionals",
    ref: (
      <span>
        G. Prandini, A. Marrazzo, I. E. Castelli, N. Mounet and N. Marzari, npj
        Computational Materials 4, 72 (2018).{" "}
        <a href="http://www.materialscloud.org/sssp/" target="_blank">
          http://www.materialscloud.org/sssp/
        </a>
      </span>
    ),
  },
  vdw_radii: {
    type: "vdw_radii",
    ref: (
      <span>
        S. Alvarez, A cartography of the van der Waals territories. Dalton
        Transactions, 42(24):8617–8636, 2013.
      </span>
    ),
  },
  lebegue: {
    type: "other_studies",
    ref: (
      <span>
        S. Lebegue et al., Two-dimensional materials from data filtering and ab
        initio calculations. Physical Review X, 3:031002, 2013.
      </span>
    ),
  },
  bjorkman: {
    type: "other_studies",
    ref: (
      <span>
        T. Björkman et al., van der Waals bonding in layered compounds from
        advanced density-functional first-principles calculations. Physical
        Review Letters, 108(23):235502, 2012.
      </span>
    ),
  },
  ashton: {
    type: "other_studies",
    ref: (
      <span>
        M. Ashton et al., Topology-Scaling Identification of Layered Solids and
        Stable Exfoliated 2D Materials. Physical Review Letters, 118(10):106101,
        2017.
      </span>
    ),
  },
  cheon: {
    type: "other_studies",
    ref: (
      <span>
        G. Cheon et al., Data Mining for New Two- and One-Dimensional Weakly
        Bonded Solids and Lattice-Commensurate Heterostructures. Nano Letters,
        17(3):1915, 2017.
      </span>
    ),
  },
  choudhary: {
    type: "other_studies",
    ref: (
      <span>
        K. Choudhary et al., High-throughput Identification and Characterization
        of Two-dimensional Materials using Density functional theory. Scientific
        Reports, 7(1):5179, 2017.
      </span>
    ),
  },
  haastrup: {
    type: "other_studies",
    ref: (
      <span>
        S. Haastrup et al., The Computational 2D Materials Database:
        high-throughput modeling and discovery of atomically thin crystals. 2D
        Materials, 5(4):042002, 2018.
      </span>
    ),
  },
};

function refNr(key) {
  return Object.keys(references).indexOf(key) + 1;
}

function getRef(key) {
  // the <a> ancor element doesn't work with react router, so use the HashLink instead
  return (
    <sup>
      <HashLink className="cite-anchor" to={"#ref" + refNr(key)}>
        [{refNr(key)}]
      </HashLink>
    </sup>
  );
}

function renderRefs(type) {
  return Object.keys(references).map((key) => {
    if (references[key]["type"] != type) return;
    let nr = refNr(key);
    return (
      <div id={"ref" + nr} key={nr}>
        [{nr}] {references[key]["ref"]}
      </div>
    );
  });
}

export const aboutText = (
  <div className="about-text-container">
    <div className="about-h">How to cite</div>
    <p>If you use this tool or data, please cite the following works:</p>
    <CitationBox
      title={
        <span>
          Two-dimensional materials from high-throughput computational
          exfoliation of experimentally known compounds
        </span>
      }
      authors={
        <span>
          N.Mounet, M.Gibertini, P.Schwaller, D.Campi, A.Merkys, A.Marrazzo,
          T.Sohier, I.E.Castelli, A.Cepellotti, G.Pizzi & N.Marzari
        </span>
      }
      journal="Nat. Nanotech. 13, 246-252"
      doi="10.1038/s41565-017-0035-5"
      year="2018"
      data={
        <span>
          N. Mounet et al., Materials Cloud Archive 2020.158, doi:{" "}
          <a
            href="https://doi.org/10.24435/materialscloud:az-b2"
            target="_blank"
          >
            10.24435/materialscloud:az-b2
          </a>{" "}
          (2020)
        </span>
      }
    />
    <CitationBox
      title={<span>Expansion of the Materials Cloud 2D Database</span>}
      authors={
        <span>D. Campi, N. Mounet, M. Gibertini, G. Pizzi & N. Marzari</span>
      }
      journal="ACS Nano 17, 12, 11268-11278"
      doi="10.1021/acsnano.2c11510"
      year="2023"
      data={
        <span>
          D. Campi et al., Materials Cloud Archive 2022.84, doi:{" "}
          <a
            href="https://doi.org/10.24435/materialscloud:36-nd"
            target="_blank"
          >
            10.24435/materialscloud:36-nd
          </a>{" "}
          (2022)
        </span>
      }
      arxiv={
        <span>
          D. Campi et al., arXiv:2210.11301, doi:{" "}
          <a href="https://doi.org/10.48550/arXiv.2210.11301" target="_blank">
            10.48550/arXiv.2210.11301
          </a>{" "}
          (2022)
        </span>
      }
    />
    <p>
      The proper reference for each structure is reported in the box beside the
      structure formula.
    </p>
    <div className="about-h">General overview</div>
    <p>
      The 2D structures are originating from the computational exfoliation of
      experimental bulk (3D) materials extracted from the MPDS{getRef("mpds")},
      the COD{getRef("cod")} and the ICSD{getRef("icsd")} databases. The
      computational procedure consisted in:
    </p>
    <ul>
      <li>
        cleaning improperly formatted CIF files with <b>cod-tools</b>
        {getRef("cod")}
        {getRef("cod_parser")};
      </li>
      <li>
        filtering out disordered structures, incompletely defined ones and those
        obviously wrong;
      </li>
      <li>
        converting CIF files into <b>AiiDA</b>
        {getRef("aiida1")}
        {getRef("aiida2")} structures, using <b>pymatgen</b>
        {getRef("pymatgen")};
      </li>
      <li>
        correcting round-off errors in the atomic positions to recover the
        structure symmetries, thanks to <b>spglib</b>
        {getRef("spglib")};
      </li>
      <li>filtering out duplicate structures{getRef("pymatgen")};</li>
      <li>
        screening layered materials thanks to a geometrical algorithm based on
        the identification of chemical bonds from interatomic distances, using
        van der Waals atomic radii provided by Ref.{getRef("vdw_radii")};
      </li>
      <li>
        relaxing and computing the binding energies of the layered materials,
        using the <b>Quantum ESPRESSO</b>
        {getRef("qe")} code with <b>DFT-PBE</b> van der Waals functionals (
        <b>rVV10</b>
        {getRef("vdw_lee")}
        {getRef("vdw_cooper")} and <b>DF2-C09</b>
        {getRef("vdw_vydrov")}
        {getRef("vdw_sabatini")}), tested and converged pseudopotentials from
        the <b>SSSP</b>
        {getRef("sssp")};
      </li>
      <li>
        selecting easily exfoliable materials as those for which the binding
        energy is less than 30 meV/&#8491;<sup>2</sup>
        (with the DF2-C09 functional) or 35 meV/&#8491;<sup>2</sup> (with rVV10)
        and potentially exfoliable materials for which the binding energy is
        less than 120 meV/&#8491;<sup>2</sup>;
      </li>
      <li>
        optimizing the geometry of the monolayers as an isolated system using
        the PBE{getRef("pbe")} functional.
      </li>
    </ul>
    <p>
      On the subset of 2D easily exfoliable monolayers with less than 6 atoms in
      the unit cell, found in N. Mounet et al., Nat. Nanotech.
      doi:10.1038/s41565-017-0035-5 (2018) we also computed (at the PBE level):
    </p>
    <ul>
      <li>
        possible ferromagnetic and antiferromagnetic configurations, to obtain
        the magnetic ground state;
      </li>
      <li>electronic band structure;</li>
      <li>phonon dispersion curves.</li>
    </ul>
    <p>More details can be found in the associated publications.</p>
    <div className="about-h">Acknowledgements and references</div>
    <b>HPC support</b>
    <br />
    Computational resources for this project have been provided by PRACE (Grant
    2016163963 on KNL/Marconi at Cineca) and by the NCCR MARVEL (Piz Daint at
    CSCS).
    <br />
    <b>Crystal structure databases</b>
    {renderRefs("db")}
    <b>Software</b>
    {renderRefs("software")}
    <b>Pseudopotentials and van der Waals functionals</b>
    {renderRefs("pseudo_functionals")}
    <b>Van der Waals radii</b>
    {renderRefs("vdw_radii")}
    <b>Other studies</b>
    {renderRefs("other_studies")}
  </div>
);
