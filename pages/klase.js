import TabelaKlasa from "../components/index/tabela_klasa.component";
import { useState, useEffect } from "react";
import Parcel from "../models/parcel";
import dbConnect from "../utils/mongoose";

export default function Klase({ objekat, klase }) {
  return (
      <TabelaKlasa objekat={objekat} klase={klase} />
  );
}

export async function getStaticProps(context) {
  await dbConnect();
  let pocetno = await Parcel.aggregate([
    {
      $group: {
        _id: {
          vlasnistvo: "$vlasnistvo",
          klasa: "$klasa",
        },
        sum: { $sum: "$povrsina" },
      },
    },
  ]);
  const f = {};
  const klase = ["ostalo"];
  let klaseBitne = [
    "Njiva I",
    "Njiva II",
    "Njiva III",
    "Njiva IV",
    "Njiva V",
    "Njiva VI",
  ];
  pocetno.map((red) => {
    if (f[red._id.vlasnistvo]) {
      //ako postoji vlasnistvo
      if (f[red._id.vlasnistvo][red._id.klasa]) {
        //ako postoji klasa
        f[red._id.vlasnistvo][red._id.klasa] += red.sum;
      } else {
        // ako ne postoji klasa
        if (klaseBitne.includes(red._id.klasa)) {
          f[red._id.vlasnistvo][red._id.klasa] = red.sum;
        } else {
          f[red._id.vlasnistvo]["ostalo"] += red.sum;
        }
      }
    } else {
      // ako ne postoji vlasnistvo
      f[red._id.vlasnistvo] = {
        ostalo: 0,
      };
      if (klaseBitne.includes(red._id.klasa)) {
        f[red._id.vlasnistvo][red._id.klasa] = red.sum;
      } else {
        console.log("*", red.sum);
        f[red._id.vlasnistvo]["ostalo"] = red.sum;
      }
    }

    // samo za klase array
    if (!klase.includes(red._id.klasa)) {
      if (klaseBitne.includes(red._id.klasa)) {
        klase.push(red._id.klasa);
      }
    }
  });
  //console.log(f);
  //console.log("klase", klase);

  return {
    props: {
      objekat: f,
      klase: klase.sort(),
    },
  };
}
