(() => {
  "use strict";
  var e = {
      269: function (e, t, o) {
        var n =
            (this && this.__awaiter) ||
            function (e, t, o, n) {
              return new (o || (o = Promise))(function (r, i) {
                function s(e) {
                  try {
                    u(n.next(e));
                  } catch (e) {
                    i(e);
                  }
                }
                function a(e) {
                  try {
                    u(n.throw(e));
                  } catch (e) {
                    i(e);
                  }
                }
                function u(e) {
                  var t;
                  e.done
                    ? r(e.value)
                    : ((t = e.value),
                      t instanceof o
                        ? t
                        : new o(function (e) {
                            e(t);
                          })).then(s, a);
                }
                u((n = n.apply(e, t || [])).next());
              });
            },
          r =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const i = r(o(320));
        t.default = new (class {
          createJob(e) {
            return n(this, void 0, void 0, function* () {
              try {
                return yield i.default.createJob(e);
              } catch (e) {
                return void console.error(e);
              }
            });
          }
          fetchJob() {
            return n(this, void 0, void 0, function* () {
              try {
                return yield i.default.fetchJob();
              } catch (e) {
                console.error(e);
              }
            });
          }
        })();
      },
      366: function (e, t, o) {
        var n =
            (this && this.__awaiter) ||
            function (e, t, o, n) {
              return new (o || (o = Promise))(function (r, i) {
                function s(e) {
                  try {
                    u(n.next(e));
                  } catch (e) {
                    i(e);
                  }
                }
                function a(e) {
                  try {
                    u(n.throw(e));
                  } catch (e) {
                    i(e);
                  }
                }
                function u(e) {
                  var t;
                  e.done
                    ? r(e.value)
                    : ((t = e.value),
                      t instanceof o
                        ? t
                        : new o(function (e) {
                            e(t);
                          })).then(s, a);
                }
                u((n = n.apply(e, t || [])).next());
              });
            },
          r =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const i = r(o(485));
        t.default = new (class {
          createJob(e) {
            return n(this, void 0, void 0, function* () {
              yield (0, i.default)("./.env")("jobs").del();
              const {
                jobTitle: t,
                companyName: o,
                companyLocation: n,
                salaryInfo: r,
                snippet: s,
                detailLink: a,
                jobId: u,
              } = e;
              return yield (0, i.default)("./.env")("jobs").insert({
                jobTitle: t,
                companyName: o,
                companyLocation: n,
                salaryInfo: r,
                snippet: s,
                detailLink: a,
                jobId: u,
              });
            });
          }
          fetchJob() {
            return n(this, void 0, void 0, function* () {
              return yield (0, i.default)("./.env")("jobs")
                .select()
                .from("jobs");
            });
          }
        })();
      },
      485: function (e, t, o) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = n(o(514)),
          i = n(o(873));
        t.default = function (e) {
          return (0, r.default)((0, i.default)(e).development);
        };
      },
      873: function (e, t, o) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = n(o(142));
        t.default = function (e) {
          return (
            r.default.config({ path: void 0 === e ? "../.env" : e }),
            {
              development: {
                client: "postgresql",
                connection: {
                  port: Number(process.env.DB_PORT),
                  database: process.env.DATABASE,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASS,
                },
                pool: { min: 2, max: 10 },
                migrations: { tableName: "knex_migrations" },
              },
            }
          );
        };
      },
      492: function (e, t, o) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = n(o(860)),
          i = o(183),
          s = n(o(841)),
          a = n(o(269)),
          u = n(o(582)),
          c = (0, r.default)();
        c.use(r.default.json()),
          c.use((0, u.default)()),
          c.listen(3001, () => console.log("Running on port 3001"));
        let l = [],
          d = [],
          f = {};
        !(function () {
          try {
            a.default.fetchJob().then((e) => {
              e && ((d = e), console.log("Successfully getting data from DB"));
            }),
              (0, i.scrapeAllJobs)(
                "https://www.indeed.com/jobs?q=Front+end+engineer&sc=0kf%3Ajt%28internship%29%3B"
              ).then((e) => {
                (l = e),
                  (d = e),
                  console.log("Done!", e),
                  e.forEach((e) => {
                    e.forEach((e, t) => {
                      a.default.createJob(e),
                        console.log(`Pushing job with id ${t}`);
                    });
                  });
              });
          } catch (e) {
            console.error(e);
          }
        })(),
          c.use("/register", s.default),
          c.get("/jobsIndeed/", (e, t) => {
            t.send(0 !== l.length ? l : d);
          }),
          c.get("/jobsIndeed/detail/:jobDetailId", (e, t) => {
            console.log(e.params.jobDetailId),
              console.log("Start to scrape the job detail"),
              (0, i.scrapeJobDetail)(e.params.jobDetailId).then((e) => {
                (f = e), console.log("Done!");
              }),
              0 !== Object.keys(f).length
                ? t.send(f)
                : t.send(
                    `Start processing to scrape the job detail Id: ${e.params.jobDetailId}`
                  );
          }),
          c.get("/", (e, t) => {
            t.send("Welcome to Job Searcher Extension Backend");
          });
      },
      841: function (e, t, o) {
        var n =
            (this && this.__awaiter) ||
            function (e, t, o, n) {
              return new (o || (o = Promise))(function (r, i) {
                function s(e) {
                  try {
                    u(n.next(e));
                  } catch (e) {
                    i(e);
                  }
                }
                function a(e) {
                  try {
                    u(n.throw(e));
                  } catch (e) {
                    i(e);
                  }
                }
                function u(e) {
                  var t;
                  e.done
                    ? r(e.value)
                    : ((t = e.value),
                      t instanceof o
                        ? t
                        : new o(function (e) {
                            e(t);
                          })).then(s, a);
                }
                u((n = n.apply(e, t || [])).next());
              });
            },
          r =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const i = r(o(860)).default.Router();
        i.post("/", (e, t) =>
          n(void 0, void 0, void 0, function* () {
            try {
              const {
                first_name: t,
                last_name: o,
                email: n,
                password: r,
                confirmPassword: i,
                skills: s,
                experience: a,
              } = e.body;
            } catch (e) {
              console.log(e), t.status(500).send("Server Error!");
            }
          })
        ),
          (t.default = i);
      },
      320: function (e, t, o) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = n(o(366));
        t.default = new (class {
          createJob(e) {
            return r.default.createJob(e);
          }
          fetchJob() {
            return r.default.fetchJob();
          }
        })();
      },
      582: (e) => {
        e.exports = require("cors");
      },
      142: (e) => {
        e.exports = require("dotenv");
      },
      860: (e) => {
        e.exports = require("express");
      },
      183: (e) => {
        e.exports = require("jse-jobs-scraper");
      },
      514: (e) => {
        e.exports = require("knex");
      },
    },
    t = {};
  !(function o(n) {
    var r = t[n];
    if (void 0 !== r) return r.exports;
    var i = (t[n] = { exports: {} });
    return e[n].call(i.exports, i, i.exports, o), i.exports;
  })(492);
})();
